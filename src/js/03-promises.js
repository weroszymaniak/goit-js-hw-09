import { Notify } from 'notiflix/build/notiflix-notify-aio';

formEl = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onResolve({ position, delay }) {
  return Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onReject({ position, delay }) {
  return Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function onSubmit(event) {
  event.preventDefault();
  let step = Number(event.currentTarget.step.value);
  let delay = Number(event.currentTarget.delay.value);
  let amount = Number(event.currentTarget.amount.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay).then(onResolve).catch(onReject);
    delay += step;
  }
}

formEl.addEventListener('submit', onSubmit);
