const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

function changeBodyColor() {
  btnDisabled();
  timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = `${randomColor}`;
  }, 1000);
}

function stopBodyColor() {
  clearInterval(timerId);
  btnDisabled();
}

function btnDisabled() {
  if (!startBtn.disabled) {
    startBtn.disabled = true;
    stopBtn.disabled = false;
  } else {
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', changeBodyColor);
stopBtn.addEventListener('click', stopBodyColor);
