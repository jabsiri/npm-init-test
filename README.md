
## Create React App ( CRA )
	npx create-react-app [project-name]
> **Note** : React CRA 
> (https://ko.reactjs.org/docs/create-a-new-react-app.html#create-react-app
> https://www.npmjs.com/package/create-react-app)

## WebPack is..
>**webpack** is a static **module bundler** for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles.

모듈 번들러.... What?

**모듈이란**

-- 프로그램을 재사용성이 용이하게 작게 나눈 단위

**번들이란**

-- 의존성에 맞게 모듈을 묶은 것

## Why use webpack?

javascript의 모듈 관리와, 웹 개발 작업의 자동화 도구.
 
## How to use webpack?
**Node.js is..**

> "비동기 이벤트 주도 JavaScript 런타임으로써 Node.js 는 확장성 있는 네트워크 애플리케이션을 만들 수 있도록 설계되었습니다."

즉, 서버개발이 가능하다. 그럼 front-end에서는? 
front-end개발자는 npm 으로 의존성 모듈 관리, Babel, Webpack과 같은 CLI를 Node.js 위에서 구동한다.
	
**npm (Node Package Manger)**
> npm makes it easy for JavaScript developers to share and reuse code, and makes it easy to update the code that you’re sharing, so you can build amazing things.

npm은 Node.js의 의존성과 패키지 관리를 위한 패키지 매니저
(node로 만든 library를 npm에 등록하고 download 하여 사용한다. https://www.npmjs.com/)

> **Note:** java의 Maven, gradle, php의 Composer와 같다.

**Package(Project) 생성**

	npm init
	
	
## Package installation
**Latte is horse....** 
파일 다운로드..CDN...
	
```html
<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
```

**배운사람이라면... NPM**

	npm i react
- Global 설치 : 터미널에서 모듈의 명령어를 사용할 일이 있다면 Global로 설치합니다.
-  Local 설치 : 소스내에서 require()로 불러들이는 모듈들은 Local로 설치합니다.

	    
**ex)axios 설치**

	npm install axios
	
## Module Management History
	

ES2015부터 모듈을 지원하기 시작한다 (import/export)
https://sy34.net/javascript-module-and-standard/

 - 일반적인 내가 아는 방식
	```html
	<script src="..."></script>
	```
- IIFE(Immediately Invoked Function Expressions)방식 모듈. namespace 사용
	```javascript
	var bd = bd || {};
	(function(){
		function sum (a, b) {
			return a + b;
		}
	})();
	bd.sum = sum;
	```	
- 춘추전국 시대(?)
	하지만 이런 방식은 브라우저에서는 결정적인 단점이 있다. 필요한 모듈을 모두 내려받을 때까지 아무것도 할 수 없게 되는 것이다. (SPA를 사용하기 위해 그때 그때 사용할 모듈을 로딩하면 best )

	- CommonJS		exports, require('./math.js');  노드진영
	- AMD (Asynchronous Module Definition)		define([], function(){}); 	브라우저
	- UMD(Universal Module Definition) CommonJS와 AMD의 통합 방식
	
	- ES2015에서 표준 모듈 시스템
	export, import
	브라우저의 한계.. 모든 브라우저에서 지원 하지 않음.


- 그래서 나왔다. **webpack...** 

**webpack install**

	npm install -D webpack webpack-cli 
 
**webpack 실행**

	node_modules/.bin/webpack --mode development --entry ./src/app.js --output-path ./dist
	==
	npx webpack --mode development --entry ./src/app.js -o ./dist
	
> **Note** npx는 패키지를 설치하지 않고, npm 패키지를 1회성으로 즉석 실행해볼 수 있는 도구.
> 로컬에 설치가 되어 있다면 설치되어 있는 패키지를 실행.
> lite-server로 차이점 설명.



	
다시 정리하자면 Module Bundler는 각각의 모듈들에 대해 의존성 관계를 파악하여 그룹핑해주는 것.
즉, webpack은 의존성들의 관계들을 묶으면서 여러가지 기능들을 자동 수행시켜주는 도구.

**webpack.config.js**
```javascript
const  path = require('path'); //core module 이라 따로 설치가 없음.
module.exports = {             //CommonJs에 해당하는 node의 모듈임.
  mode :  'development',
  //entry : './src/app.js',    //기본이 main.js로 만들어짐.
  entry : {
    test :  './src/app.js'
  },
  output : {
    path :  path.resolve('./dist'), //절대경로가 필요함
	filename :  '[name].js'         //entry의 하위 key 'main' [name]에 할당 된다.
  }
};
```

> **Note** 자세한 설정은 [여기](https://webpack.js.org/configuration/)서 


## Loader ( Preprocessor )
각 리소스의 모듈들을(typscript, css, image 등) 사용할때 javascript code로 처리 가능하게 해준다.
웹팩은 자바스크립트 밖에 모른다. 비 자바스크립트 파일을 웹팩이 이해하게끔 변경해야하는데 로더가 그런 역할을 한다.
웹팩은 javascript밖에 모르는 바보...

**[css-loader](https://webpack.js.org/loaders/css-loader/), [style-loader](https://webpack.js.org/loaders/style-loader/), [file-loader](https://webpack.js.org/loaders/file-loader/), [url-loader](https://webpack.js.org/loaders/url-loader/)**
		
	npm i -D style-loader
	npm i -D css-loader
	npm i -D file-loader
	npm i -D url-loader
	....

**webpack.config.js**
```javascript
module : {
  rules:[ //loader를 적용할 rule
    {
      test : /\.js$/, //.js로 끝나는 파일 정규식
      use : [path.resolve('./my-webpack-loader.js')] //위의 test에 해당하는 파일을 적용할 loader
    }
  ]
}
```

**my-webpack-loader.js ( Custom Loader )**
```javascript
/*
loader가 읽은 파일의 내용이 함수의 파라미터로 전달됨.
loader를 사용하려면 webpack.config.js 설정파일 module 객체에 추가해야 함
*/
module.exports = function  myWebpackLoader(content) {
  console.log("=====my-webpack-loader.js=====");
  console.log(content);
  return  content;
}
```

## Plugin ( Post-processor )

> 어여가.. 뒷일은 내가 처리할께..

로더가 모듈별로 처리를 한다면 플러그인은 번들된 결과물을 처리한다.
후처리?
플러그인은 javascript class ( webpack.config.js에 생성자만 들어갈수 있다. )로 생성해야한다.

https://webpack.js.org/contribute/writing-a-plugin/#basic-plugin-architecture

**[BannerPlugin](https://webpack.js.org/plugins/banner-plugin/)** - webpack 기본제공
build time, commnet 추가에 이용 사용

**[DefinePlugin](https://webpack.js.org/plugins/define-plugin/)**  - webpack 기본제공
배포환경 및 글로벌 정적 상수 등을 선언할때 사용

**[HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)** - html에 js, css 등을 자동으로 import 시켜준다.
	npm install -D html-webpack-plugin

**[CleanWebpackPlugin](https://www.npmjs.com/package/clean-webpack-plugin)** - 빌드 폴더를 제거 / 정리하는 웹팩 플러그인.
	npm install -D clean-webpack-plugin

```javascript
const  webpack = require('webpack');
const  MyWebPackPlugin = require('./my-webpack-plugin');
const  banner = require('./banner.js');
const  HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

plugins: [ //배열로 설정한다.
  new  MyWebPackPlugin(), //plugin 생성자 함수를 선언한다.
  new  webpack.BannerPlugin(banner),
  new  webpack.DefinePlugin({  //빈객체를 넣어도 기본으로 node의 환경 변수를 주입해준다.
  'VERSION' :  JSON.stringify("v1.1.0"),
  'API.DOMAIN' :  JSON.stringify("jabsiri.co.kr"),
  'MODE':  JSON.stringify(MODE),
  'ALERT' :  "alert(1+1);"
  }), 
  new  HtmlWebpackPlugin({
    template :  './index.html', //템플릿 경로
    templateParameters: { //템플릿에 주입할 파라매터 변수 지정
      env :  MODE
    },
   hash: true, // 정적 파일을 불러올때 쿼리문자열에 웹팩 해쉬값을 추가한다
  })
]
```

## Babel
 > [Babel is a JavaScript compiler.](https://babeljs.io/)
입력과 출력이 모두 자바스크립트 코드인 컴파일러다.(transpiler 라고도 한다.) 초기에는 ES6->ES5코드로 변환해  주는 역활만 했다. 현재는 React의 JSX문법, Typescript와 같은 정적 타입언어, 코드 압축 등을 한다.

	npm i -D @babel/core  @babel/cli

babel_app.js
```javascript
const  alert = msg  =>  window.alert(msg);
```
babel 실행

	npx babel babel_app.js

Babel은 아래 3단계로 진행이 되는데 기본 Babel은 1,3번만 진행하고, 2번은 Plugin이 담당한다.
 1. 파싱(Parsing)
 2. 변환(Transforming)
 3. 출력(Printing)

	
### Babel Plugin
[plugin-transform-block-scoping](https://babeljs.io/docs/en/babel-plugin-transform-block-scoping) : const and let to ES5
[@babel/plugin-transform-arrow-functions](https://babeljs.io/docs/en/babel-plugin-transform-arrow-functions) :  arrow functions to ES5
[@babel/plugin-transform-strict-mode](https://babeljs.io/docs/en/babel-plugin-transform-strict-mode) : This plugin places a 'use strict'; directive at the top of all files to enable strict mode


	npm i -D @babel/plugin-transform-block-scoping
	npm i -D @babel/plugin-transform-arrow-functions
	npm i -D @babel/plugin-transform-strict-mode
	npx babel babel_app.js \
	 --plugins @babel/plugin-transform-block-scoping \
	 --plugins @babel/plugin-transform-arrow-functions \
	 --plugins @babel/plugin-transform-strict-mode

### [Presets](https://babeljs.io/docs/en/presets)
Babel의 plugins set을 구성한다. ( 목적에 맞게 )
공식적으로 지원하는 프리셋도 있다. 

 - @babel/preset-env
 - @babel/preset-flow
 - @babel/preset-react
 - @babel/preset-typescript
 - 등.
>Many other community maintained presets are available [on npm](https://www.npmjs.com/search?q=babel-preset)!

	npm i -D@babel/preset-env

```javascript
  //babel-myMyPreset.js
  module.exports = function  mypreset() {
    return {
      plugins: [
        "@babel/plugin-transform-arrow-functions",
        "@babel/plugin-transform-block-scoping",
        "@babel/plugin-transform-strict-mode"
      ],
    }
  }
  
  //babel.config.json
  {
    "plugins":[],
    "presets":["./babel-myPreset.js"]
  }
```

```javascript
  //babel.config.json
  {
    "plugins":[],
    "presets":[["@babel/preset-env", 
      {
        "targets":{
          "chrome":"79",
          "ie": "11"
        }
    }]]
  }
```

하지만 Babel은 ES5로 코드를 변환해주지만 Promise, Map, Set... 등과 같은 신규 기능을 처리하지 못한다. 이러한 기능들도 완벽하게 사용하기 위해서는 Polyfill이 필요하다.

## Polyfill
babel에서 변환하지 못하는 기능(Promise, Map, Set)들을 ES5에서 사용가능하도록 구현해놓은 것.
babel-polyfill은 내부적으로 facebook에서 만든 Generator Function polyfill인 regenerator runtime과 ES5/6/7 polyfill인 core-js를 주요 dependency로 가지고 있다. 가장 유명하고 안정적인 polyfill들을 사용하기 편리하게 래핑해 놓은 모듈이라고 생각하면 편하다.

```javascript
//babel_app.js
const  alert = msg  =>  window.alert(msg);
let  promise = new  Promise();

//babel.config.json
{
  "plugins":[],
  "presets":[["@babel/preset-env", {
    "targets":{
      "chrome":"79",
      "ie": "11"
    },
    "useBuiltIns":"usage",
    "corejs":{
      "version":2
    }
  }]]
}
```
	npx babel babel_app.js


## webpack babel-loader

babel-loader가 babel로 처리 못하는 ( 예:primise ) 내용이 있을 경우 core-js dptj 자동으로 해당 기능을 구현한 모듈을 import 한다. 

```javascript
require("core-js/modules/es6.promise");
require("core-js/modules/es6.object.to-string");
```

	npm i -D babel-loader
	npm i core-js	//core-js에서 제공하는 모듈을 import하기에 필요


## 참고
[프로트엔드 개발환경의 이해](https://jeonghwan-kim.github.io/series/2019/12/09/frontend-dev-env-npm.html)

[강의 동영상](https://www.youtube.com/watch?v=L9gr4fO4OhQ)
