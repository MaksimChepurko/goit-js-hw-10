let userSelectedDate = null;

const button = document.querySelector('[data-start]');

function buttonToggle(anyButton, shouldEnabled) {
  if (shouldEnabled) {
    anyButton.removeAttribute('disabled');
  } else {
    anyButton.setAttribute('disabled', 'true');
  }
}

const counterData = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  isActive: false,
};

buttonToggle(button, false);
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const timeNow = new Date();
    const selectedDate = new Date(selectedDates[0]);
    if (!counterData.isActive) {
      if (timeNow.getTime() > selectedDate.getTime()) {
        iziToast.warning({
          title: 'Caution',
          message: 'Please choose a date in the future',
          position: 'topRight',
          timeout: 2000,
        });
        if (!button.hasAttribute('disabled')) {
          buttonToggle(button, false);
        }
      } else {
        buttonToggle(button, true);
        userSelectedDate = selectedDate.getTime();
      }
    } else {
      iziToast.error({
        title: 'Wait',
        message:
          'Please select a new target, then mark the old timer as completed.',
        position: 'topCenter',
        timeout: 4000,
      });
      buttonToggle(input.input, false);
      return;
    }
  },
};

const input = flatpickr('#datetime-picker', options);

function timeUntil(sellectedTime) {
  const nowData = Date.now();
  return sellectedTime - nowData;
}
const addLeadingZero = value =>
  value.toString().length < 2 ? value.toString().padStart(2, '0') : value;

button.addEventListener('click', event => {
  counterData.isActive = true;
  if (counterData.isActive) {
    buttonToggle(button, false);
    buttonToggle(input.input, false);
  } else {
    return;
  }
  const targetTime = new Date(userSelectedDate);
  const timerId = setInterval(() => {
    const time = timeUntil(userSelectedDate);
    const { seconds, minutes, hours, days } = convertMs(time);
    if (!(time <= 0)) {
      counterData.days.textContent = addLeadingZero(days);
      counterData.hours.textContent = addLeadingZero(hours);
      counterData.minutes.textContent = addLeadingZero(minutes);
      counterData.seconds.textContent = addLeadingZero(seconds);
    } else {
      clearInterval(timerId);
      counterData.seconds.textContent = '00';
      buttonToggle(input.input, true);
      counterData.isActive = false;
      iziToast.success({
        title: 'Time is up!',
        message: `It's now ${targetTime}`,
        position: 'center',
        timeout: 2000,
      });
    }
  }, 1000);
});

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