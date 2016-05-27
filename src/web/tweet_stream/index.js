var WebSocketServer = require('ws').Server
var Twit = require('twit')
var Rx = require('rx')

var T = new Twit({
  consumer_key: 'rFhfB5hFlth0BHC7iqQkEtTyw',
  consumer_secret: 'zcrXEM1jiOdKyiFFlGYFAOo43Hsz383i0cdHYYWqBXTBoVAr1x',
  access_token: '14343133-nlxZbtLuTEwgAlaLsmfrr3D4QAoiV2fa6xXUVEwW9',
  access_token_secret: '57Dr99wECljyyQ9tViJWz0H3obNG3V4cr5Lix9sQBXju1'
});

var Server = new WebSocketServer({ port: 8888 });
Rx.Observable.fromEvent(Server, 'connection')
  .subscribe(ws => {
    console.log('Client connected on localhost:8080')
    ws.send('hello')
    ws.send('world')
  });