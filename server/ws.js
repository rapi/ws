exports.config = {
  port: 8080,
  clientTracking: true
}
exports.handlers = {
  connect: [],
  message: [],
  close: [],
}
exports.init = function() {
  this.WebSocket = require('ws');
  this.wss = new this.WebSocket.Server(this.config);
  this.wss.on('connection', function connection(ws,req) {
    ws.ip=req.connection.remoteAddress;
    ws.on('message',function(message){
      app.logs.add(ws.ip+' sad: '+message)
      try { 
        message=JSON.parse(message)
      } catch (e) {}
      for (let i in exports.handlers.message)
        exports.handlers.message[i](ws,message)
    })
    app.logs.add('Connect '+ws.ip,'Websocket');
    ws.onclose=function(){
      app.logs.add('Leave '+ws.ip,'Websocket');
    }
    for (let i in exports.handlers.connect)
      try {
        exports.handlers.connect[i](ws);
      }catch(e){}
  });

}
exports.onConnect=function(fn){
    exports.handlers.connect.push(fn)
}
exports.onMessage=function(fn){
    exports.handlers.message.push(fn)
}

exports.onDisconect=function(fn){
    exports.handlers.close.push(fn)
}


exports.destruct=function(){
  this.wss.close()
}
