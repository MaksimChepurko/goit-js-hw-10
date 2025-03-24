const makePromise = (delay, status) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (status === 'fulfilled') {
          resolve(delay);
          return;
        } else {
          reject(delay);
        }
      }, delay);
    });
  };
  
  const form = document.querySelector('.form');
  
  form.addEventListener('submit', event => {
    event.preventDefault();
    const delay = form.elements.delay.value;
    const state = form.elements.state.value;
    makePromise(delay, state)
      .then(delay =>
        iziToast.success({ message: `✅ Fulfilled promise in ${delay}ms` })
      )
      .catch(delay =>
        iziToast.error({ message: `❌ Rejected promise in ${delay}ms` })
      );
  });
  
  // Описаний у документації
  import iziToast from 'izitoast';
  // Додатковий імпорт стилів
  import 'izitoast/dist/css/iziToast.min.css';