exports.configBox = {
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
  this.box = app.blessed.box(this.configBox);
  this.list = app.blessed.List()
  this.box.append(this.list);
  app.screen.append(this.box);
  this.thread()
}
exports.thread = function() {
  if (app.ws.wss) {
    let i=0;
    let users = ['Users: '];
    app.ws.wss.clients.forEach((ws,req)=>{

      i++;
      users.push(ws.ip)
    })
    users[0]+=i;
    this.list.setItems([]);
    this.list.setItems(users);
  }
  this.timer =setTimeout(function() {
    this.thread()
  }.bind(this), 100);
}

exports.destruct = function() {
  clearTimeout(this.timer);
}
