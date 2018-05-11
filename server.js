var app = null
var bs = require("browser-sync").create();
init();
bs.watch("./server/**/**.js").on("change", function(e) {
  destruct();
  init();

});
function destruct() {
  app.destruct()
}
function init() {
  delete require.cache[require.resolve('./server/app.js')]
  app = require('./server/app.js')
  app.init()
}
