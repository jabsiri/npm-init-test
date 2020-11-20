import * as math from "./math.js"
//import from은  변수할당을 위해 필요

import './app.css';

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#btn');
  const result = document.querySelector('#result');
  btn.addEventListener('click', () => {
    result.textContent = math.sum(1, 3);

    console.log(result.textContent);
  });
});

console.log("process.env.NODE_ENV = ", process.env.NODE_ENV);
console.log("VERSION = ", VERSION);
console.log("API.DOMAIN = ", API.DOMAIN);
console.log("MODE = ", MODE);
//ALERT