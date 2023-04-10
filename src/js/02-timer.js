import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtnEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtnEl.disabled = true;

let selectedTime = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectedTime = selectedDates[0].getTime();
    if (selectedTime < new Date()) {
      Notify.failure('Please choose a date in the future.');
      return;
    }
    startBtnEl.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

let timeObject = {};

const countingTime = () => {
  intervalId = setInterval(() => {
    const differ = selectedTime - new Date().getTime();
    if (differ <= 0) {
      clearTimeout(intervalId);
      return;
    }
    timeObject = convertMs(differ);
    changeContent(addLeadingZero(timeObject));
  }, 1000);
};

function addLeadingZero(value) {
  const newValue = { ...value };
  const keys = Object.keys(newValue);
  for (const key of keys) {
    newValue[key] = String(newValue[key]).padStart(2, 0);
  }
  return newValue;
}

function changeContent({ days, hours, minutes, seconds }) {
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtnEl.addEventListener('click', countingTime);
