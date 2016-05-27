function initialize() {
  var socket = Rx.DOM.fromWebSocket('ws://127.0.0.1:8888')
  socket.subscribe(function(x) { console.log(x.data); })
}
Rx.DOM.ready().subscribe(initialize)
