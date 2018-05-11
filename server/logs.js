exports.configBox = {
  left: '50%',
  width: '50%',
  height: '100%',
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    border: { 
      fg: '#f0f0f0'
    },
  }
}
exports.init = function() {
  this.box = app.blessed.ScrollableBox(this.configBox);

  this.list = app.blessed.ListTable()
  this.box.append(this.list);
  app.screen.append(this.box);

  this.logfile = app.fs.createWriteStream("server/log/" + (new Date().toLocaleDateString()) + ".log");
}

exports.add = function(message, module) {
  if (!module) module = '';
  else
    module = " [" + module + "] "
  this.box.insertTop(
    '[' + (new Date().toLocaleString()) + ']' +
    module +
    message
  );
  var cache = [];
  if (typeof message == 'object') message = JSON.stringify(message, function(key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  })
  this.logfile.write('[' + (new Date().toLocaleString()) + '] ' + module + message + "\n")

}
