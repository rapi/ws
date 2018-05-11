exports.modules={
  MT5:require('./modules/MT5.js')
}
exports.init = function() {
  exports.fs = require('fs');
  exports.blessed = require('blessed');
  exports.screen = this.blessed.screen({
    smartCSR: true
  });
  app = this;
  this.ws = require('./ws.js');
  this.users = require('./users.js');
  this.logs = require('./logs.js');

  this.users.init();
  this.ws.init();
  this.logs.init();
  this.render();
  for(let i in this.modules)
    try {
      this.modules[i].init()
    } catch (e) {
      this.logs.add(e,i) 
    }
  this.screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });
}
exports.render = function() {
  this.screen.render();
  setTimeout(function() {
    this.render()
  }.bind(this), 100);
}
exports.destruct = function() {
  this.ws.destruct();
  // this.screen.destroy();

}
