import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const refInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const ref = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
startBtn.setAttribute('disabled', 'disabled');
let pickerDate = null;
let isActive = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (pickerDate) {
      return;
    }
    if (Date.now() > selectedDates[0]) {
      Notiflix.Notify.warning('Please choose a date in the future', {
        timeout: 6000,
      });
      return;
    }
    pickerDate = selectedDates[0];
    startBtn.removeAttribute('disabled');
  },
};
flatpickr(refInput, options);

startBtn.addEventListener('click', start);
if (isActive) {
  startBtn.setAttribute('disabled', 'disabled');
}
function start() {
  isActive = true;
  startBtn.setAttribute('disabled', 'disabled');
  setInterval(() => {
    deltaTime = pickerDate - Date.now();
    let timeComponents = convertMs(deltaTime);
    ref.days.innerHTML = addLeadingZero(timeComponents.days);
    ref.hours.innerHTML = addLeadingZero(timeComponents.hours);
    ref.minutes.innerHTML = addLeadingZero(timeComponents.minutes);
    ref.seconds.innerHTML = addLeadingZero(timeComponents.seconds);
  }, 1000);
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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
