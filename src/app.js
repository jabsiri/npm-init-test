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

//polyfill 테스트
function async1 (param) {
  return new Promise(function(resolve, reject) {
      resolve(param*2);
  });
}
function async2 (param) {
  return new Promise(function(resolve, reject) {
      resolve(param*3);
  });
}
function async3 (param) {
  return new Promise(function(resolve, reject) {
      resolve(param*4);
  });
}

var start = 1;
async1(start)
  .then(async2)
  .then(async3)
  .then(result => {
      console.log(result); // 24
  });