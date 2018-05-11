exports.config = {
  'MT5_CONNECTION_TIMEOUT': 30000,
  'MT5_SERVER_IP': "185.17.144.162",
  'MT5_SERVER_PORT': 443,
  'MT5_SERVER_PORT_SYMBOL': 33333,
  'MT5_SERVER_PORT_TRADE': 25001,
  'MT5_SERVER_WEB_LOGIN': 1014,
  'MT5_SERVER_WEB_PASSWORD': "abc123",
  'PAGE_ENCODING': "utf-8",
  'AGENT': "WebRegistration",
  'VERSION': 1571,
  'TYPE': 'MANAGER',
  'WEB_PREFIX_WEBAPI': "%04x%04x",
  'HEADER_LENGTH': 9,
  'WEB_API_WORD': 'WebAPI',
}
exports.init = function() {

  this.net = require('net');
  this.client = new this.net.Socket();
  this.client.connect(this.config.MT5_SERVER_PORT, this.config.MT5_SERVER_IP, function() {
    app.logs.add('Connected', 'MT5');
    this.auth()

  }.bind(this));

  // app.ws.onMessage(function(user,message){
  //   console.log(message.module);
  //   if(message.module=="MT5")
  //     if(message.action && this['_'+message.action])
  //     try {
  //       this['_'+message.action](user)
  //     } catch (e) {
  //         app.logs.add(e,'MT5')
  //     }
  // })
}

exports.auth = function(arr) {
  this.send('AUTH_START', {
    "VERSION": this.config.VERSION,
    "AGENT": this.config.AGENT,
    "LOGIN": this.config.MT5_SERVER_WEB_LOGIN,
    "TYPE": this.config.TYPE
  })
}
exports.n_req = 0
exports.send = function(action, arr) {
  this.n_req++
    str = action + '|'
  for (key in arr)
    str += key + "=" + arr[key] + '|';
  str += "\r\n"
  str=Buffer.from(str, 'utf8').toString('utf16le')
  app.logs.add(str);
}
