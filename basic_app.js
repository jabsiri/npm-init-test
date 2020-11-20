document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#btn');
  const result = document.querySelector('#result');
  btn.addEventListener('click', () => {
    result.textContent = sum(1, 3);
  });
})