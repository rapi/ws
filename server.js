var app = require('./server/app.js')
app.init()
var bs = require("browser-sync").create();
bs.watch("./server/**/**.js").on("change", function(e) {
  setTimeout(()=>{
    app.destruct()
    delete require.cache[require.resolve('./server/app.js')];
    delete require.cache[require.resolve('./server.js')];
    delete require.cache[require.resolve('./'+e)];
    app = require('./server/app.js')
    app.init()
},300)
});
