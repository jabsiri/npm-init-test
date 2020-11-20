
/*
  loader가 읽은 파일의 내용이 함수의 파라미터로 전달됨. 
  loader를 사용하려면 webpack.config.js 설정파일 module 객체에 추가해야 함
*/
module.exports = function myWebpackLoader(content) {
  console.log("=====my-webpack-loader.js=====");
  console.log(content);

  content = content.replace("console.log", "alert");
  return content;
};