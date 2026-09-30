import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  form: document.querySelector('.form'),
};

function onFormSubmit(event) {
  event.preventDefault();
  const data = {
    delay: document.querySelector('input[name="delay"]').value,
    state: document.querySelector('input[name="state"]:checked').value,
  };
  switch (data.state) {
    case 'fulfilled': {
      setTimeout(() => {
        iziToast.success({
          message: `✅ Fulfilled promise in ${data.delay}ms`,
          position: 'topRight',
        });
      }, data.delay);
      break;
    }
    case 'rejected': {
      setTimeout(() => {
        iziToast.error({
          message: `❌ Rejected promise in ${data.delay}ms`,
          position: 'topRight',
        });
      }, data.delay);
    }
  }
}

function onPageInit() {
  refs.form.addEventListener('submit', onFormSubmit);
}

document.addEventListener('DOMContentLoaded', onPageInit);
