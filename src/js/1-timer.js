import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;
let timerId = null;

const button = document.querySelector('[data-start]');
const input = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (counterData.isActive) {
      iziToast.error({
        title: 'Wait',
        message: 'Please stop the current timer before selecting a new date.',
        position: 'topCenter',
        timeout: 4000,
      });
      input.input.setAttribute('disabled', 'true');
      return;
    }

    const selectedDate = new Date(selectedDates[0]);
    if (selectedDate.getTime() <= Date.now()) {
      iziToast.warning({
        title: 'Caution',
        message: 'Please choose a date in the future',
        position: 'topRight',
        timeout: 2000,
      });
      buttonToggle(button, false);
    } else {
      userSelectedDate = selectedDate.getTime();
      buttonToggle(button, true);
    }
  },
});

const counterData = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  isActive: false,
};

buttonToggle(button, false);

function buttonToggle(element, shouldEnable) {
  element.disabled = !shouldEnable;
}

button.addEventListener('click', () => {
  if (counterData.isActive) return;

  counterData.isActive = true;
  buttonToggle(button, false);
  input.input.setAttribute('disabled', 'true');

  timerId = setInterval(() => {
    const timeLeft = userSelectedDate - Date.now();
    if (timeLeft <= 0) {
      clearInterval(timerId);
      counterData.isActive = false;
      input.input.removeAttribute('disabled');
      updateTimerUI(0, 0, 0, 0);
      iziToast.success({
        title: 'Time is up!',
        message: `It's now ${new Date(userSelectedDate)}`,
        position: 'center',
        timeout: 2000,
      });
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    updateTimerUI(days, hours, minutes, seconds);
  }, 1000);
});

function updateTimerUI(days, hours, minutes, seconds) {
  counterData.days.textContent = addLeadingZero(days);
  counterData.hours.textContent = addLeadingZero(hours);
  counterData.minutes.textContent = addLeadingZero(minutes);
  counterData.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor((ms % hour) / minute),
    seconds: Math.floor((ms % minute) / second),
  };
}