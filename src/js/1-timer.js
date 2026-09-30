import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

// ! CONST OBJECTS

const variables = {
  objTime: 0,
  currentTime: 0,
  timeDif: 0,
};

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button'),
  timeValues: document.querySelectorAll('.value'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

// ! CONST OBJECTS /

// ! BASIC FUNCTIONS

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

flatpickr('#datetime-picker', {
  ...options,
});

function disableElement(element) {
  element.disabled = true;
}
function enableElement(element) {
  element.disabled = false;
}

function startTimer() {
  variables.currentTime = Date.now();
  renderTimer(variables.objTime, variables.currentTime);
  const interval = setInterval(() => {
    variables.currentTime = Date.now();
    if (variables.objTime - variables.currentTime <= 1000) {
        clearInterval(interval)
        enableElement(refs.dateInput)
    }
    renderTimer(variables.objTime, variables.currentTime);
  }, 1000);
}

function renderTimer(objTime, currentTime) {
  const { days, hours, minutes, seconds } = convertMs(objTime - currentTime);
  refs.timeValues.forEach(value => {
    if ('days' in value.dataset) {
      if (days !== '') {
        value.textContent = days.toString().padStart(2, '0');
      }
    }
    if ('hours' in value.dataset) {
      if (hours !== '') {
        value.textContent = hours.toString().padStart(2, '0');
      }
    }
    if ('minutes' in value.dataset) {
      if (minutes !== '') {
        value.textContent = minutes.toString().padStart(2, '0');
      }
    }
    if ('seconds' in value.dataset) {
      if (seconds !== '') {
        value.textContent = seconds.toString().padStart(2, '0');
      }
    }
  });
}

// ! BASIC FUNCTIONS /

// ! EVENT FUNCTIONS

function onInputChange(event) {
  const dateObj = new Date(event.target.value).getTime();
  const currentTime = Date.now();
  if (currentTime < dateObj) {
    enableElement(refs.startBtn);
    variables.objTime = dateObj;
    variables.currentTime = currentTime;
  } else {
    disableElement(refs.startBtn);
    iziToast.error({
      message: 'Please choose a date in the future',
      position: 'topRight',
    });
  }
}

function onBtnClick() {
  disableElement(refs.startBtn);
  disableElement(refs.dateInput);
  startTimer();
}

function onPageInit() {
  refs.dateInput.addEventListener('change', onInputChange);
  refs.startBtn.addEventListener('click', onBtnClick);
}

// ! EVENT FUNCTIONS /

document.addEventListener('DOMContentLoaded', onPageInit);
