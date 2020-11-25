const path = require('path');   //core module 이라 따로 설치가 없음.
const webpack = require('webpack');

const MyWebPackPlugin = require('./my-webpack-plugin');
const banner = require('./banner.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  plugins: [new CleanWebpackPlugin()],
}

const MODE = "DEV";
module.exports = {              //CommonJs에 해당하는 node의 모듈임.
  mode : 'development',         //DefinePlugin 에서 process.env.NODE_ENV 할때 값으로 온다.
  //entry : './src/app.js',     //기본이 main.js로 만들어짐.
  
  entry : {
     main : './src/app.js'
  },
  output : {
    path : path.resolve('./dist'),  //절대경로가 필요함
    filename : '[name].js'          //entry의 하위 key 'main' [name]에 할당 된다.
  },

  module : {
    rules:[   //loader를 적용할 rule
      {
        test : /\.js$/,   //.js로 끝나는 파일 정규식
        exclude:path.resolve('./node_modules'),
        use : [path.resolve('./my-webpack-loader.js'), 'babel-loader']   //위의 test에 해당하는 파일을 적용할 loader

      },
      {
        test : /\.css$/,   //.js로 끝나는 파일 정규식
        use : ['style-loader', 'css-loader']  //node_modules 안에 loader가 있으면 문자열로만 지정해주면 됨.
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use : [
          { 
            loader : 'file-loader',
            options:{
              name:'[name].[ext]?[hash]',
              //publicPath:'dist'
            }
          }
        ]
      }
      
    ]
  },
  plugins: [    //배열로 설정한다.
    new MyWebPackPlugin(),   //plugin 생성자 함수를 선언한다.
    new webpack.BannerPlugin(banner),
    new webpack.DefinePlugin({
      'VERSION' : JSON.stringify("v1.1.0"),
      'API.DOMAIN' : JSON.stringify("jabsiri.co.kr"),
      'MODE': JSON.stringify(MODE),
      'ALERT' : "alert(1+1);"

    }),    //빈객체를 넣으면 기본적으로 node의 환경 변수를 주입해준다.
    new HtmlWebpackPlugin({
      template : './index.html',  //템플릿 경로
      templateParameters: {       //템플릿에 주입할 파라매터 변수 지정
        env : MODE
      },
      hash: true, // 정적 파일을 불러올때 쿼리문자열에 웹팩 해쉬값을 추가한다

    }),
    new CleanWebpackPlugin() //배포할때 배포경로를 먼저 지운다
  ]
};