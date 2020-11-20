import * as math from "./ES6_math.js"

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#btn');
  const result = document.querySelector('#result');
  btn.addEventListener('click', () => {
    result.textContent = math.sum(1, 3);
  });
})