import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function onFormSubmit(event) {
  event.preventDefault();

  const currentForm = event.currentTarget;
  const delay = Number(currentForm.elements.delay.value);
  const state = currentForm.elements.state.value;

  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });

  currentForm.reset();
}

form.addEventListener('submit', onFormSubmit);