// 正式使用前，請將下方姓名替換為實際的學長姐名單。
const seniors = ["林沐晴", "陳予安", "張以辰", "王若庭", "李書妍", "黃子謙"];

const card = document.querySelector("#card");
const seniorName = document.querySelector("#seniorName");
const instruction = document.querySelector("#instruction");
const drawAgain = document.querySelector("#drawAgain");
const resetDeck = document.querySelector("#resetDeck");
const remaining = document.querySelector("#remaining");
const confetti = document.querySelector("#confetti");

let available = [...seniors];
let isFlipped = false;
let isAnimating = false;

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function updateRemaining() {
  remaining.textContent = `本輪還有 ${available.length} 位尚未抽出`;
}

function celebrate() {
  const colors = ["#174d3a", "#bd9449", "#9f3a2d", "#f2ead7", "#668a78"];
  confetti.replaceChildren();
  for (let index = 0; index < 55; index += 1) {
    const piece = document.createElement("i");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.setProperty("--duration", `${2.3 + Math.random() * 1.7}s`);
    piece.style.setProperty("--delay", `${Math.random() * .35}s`);
    piece.style.setProperty("--drift", `${-90 + Math.random() * 180}px`);
    piece.style.setProperty("--rotation", `${360 + Math.random() * 720}deg`);
    confetti.append(piece);
  }
  window.setTimeout(() => confetti.replaceChildren(), 4400);
}

function draw() {
  if (isFlipped || isAnimating) return;
  if (available.length === 0) available = shuffle(seniors);

  isAnimating = true;
  const selectedIndex = Math.floor(Math.random() * available.length);
  const [selected] = available.splice(selectedIndex, 1);
  seniorName.textContent = selected;
  card.classList.add("flipped");
  card.setAttribute("aria-label", `你的直屬是 ${selected}`);
  instruction.textContent = "命運的卡片已經揭曉";
  drawAgain.hidden = false;
  isFlipped = true;
  updateRemaining();

  window.setTimeout(() => {
    celebrate();
    isAnimating = false;
  }, 650);
}

function turnBack() {
  if (!isFlipped || isAnimating) return;
  isAnimating = true;
  card.classList.remove("flipped");
  card.setAttribute("aria-label", "翻牌抽出直屬");
  instruction.textContent = "輕觸卡片，看看誰在另一面等你";
  drawAgain.hidden = true;
  window.setTimeout(() => {
    seniorName.textContent = "—";
    isFlipped = false;
    isAnimating = false;
  }, 850);
}

function reset() {
  available = shuffle(seniors);
  if (isFlipped) turnBack();
  updateRemaining();
}

card.addEventListener("click", draw);
drawAgain.addEventListener("click", turnBack);
resetDeck.addEventListener("click", reset);

available = shuffle(seniors);
updateRemaining();
