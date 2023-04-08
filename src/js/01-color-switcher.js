const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;
stopBtn.disabled = true;

const randomColor = function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const changeBodyColor = event => {
  btnDisabled();
  timerId = setInterval(() => {
    body.style.backgroundColor = `${randomColor}`;
  }, 1000);
};

const stopBodyColor = event => {
  clearInterval(timerId);
  btnDisabled();
};

function btnDisabled() {
  if (!startBtn.disabled) {
    startBtn.disabled = true;
    stopBtn.disabled = false;
  } else {
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
}

startBtn.addEventListener('click', changeBodyColor());
stopBtn.addEventListener('click', stopBodyColor());
