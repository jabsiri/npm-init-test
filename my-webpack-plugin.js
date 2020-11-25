var ConcatSource;
try {
    ConcatSource = require("webpack-core/lib/ConcatSource");
} catch(e) {
    ConcatSource = require("webpack-sources").ConcatSource;
}

// plugin 은 javascript class로 생성한다.
class MyPlugin {
  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {   //webpack이 compiler를 주입해준다.
    //Specify the event hook to attach to
    compiler.hooks.done.tap('MyPlugin', stats => {
      //console.log(stats);
      console.log('MyPlugin : done');
      //console.log(ConcatSource);
      //console.log("----------------");
    });
    
    compiler.hooks.emit.tapAsync({name:'MyPlugin', context:true}, (context, compilation, callback) => {
      var source = compilation.assets['main.js'].source();
      console.log(compilation.assets);
      
      compilation.assets['main.js'].source = () => {
        const banner = 
        "/** " +
        "  * BannerPlugin " +
        "  * Build Date : 2020.11.20 " + 
        "  */";
        console.log(banner);
        return banner + source;
      };
      
      callback();
    });
  }
}

module.exports = MyPlugin;