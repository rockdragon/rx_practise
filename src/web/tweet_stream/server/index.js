var WebSocketServer = require('ws').Server
var Twit = require('twit')
var Rx = require('rx')
var debug = require('debug')('tweet')

var T = new Twit({
  consumer_key: 'rFhfB5hFlth0BHC7iqQkEtTyw',
  consumer_secret: 'zcrXEM1jiOdKyiFFlGYFAOo43Hsz383i0cdHYYWqBXTBoVAr1x',
  access_token: '14343133-nlxZbtLuTEwgAlaLsmfrr3D4QAoiV2fa6xXUVEwW9',
  access_token_secret: '57Dr99wECljyyQ9tViJWz0H3obNG3V4cr5Lix9sQBXju1'
});

var stream = T.stream('statuses/filter', {
  track: 'earthquake',
  locations: []
});

var Server = new WebSocketServer({port: 8888});
Rx.Observable.fromEvent(Server, 'connection')
  .subscribe(ws => {
    console.log('Client connected on localhost:8080')

    Rx.Observable
      .fromEvent(ws, 'message')
      .flatMap(quakesObj => {
        quakesObj = JSON.parse(quakesObj)
        return Rx.Observable.from(quakesObj.quakes)
      })
      .scan([], (boundArray, quake) => {
        var bounds = [
          quake.lng - 0.3, quake.lat - 0.15,
          quake.lng + 0.3, quake.lat + 0.15
        ].map(coordinate => {
          coordinate = coordinate.toString()
          return coordinate.match(/\-?\d+(\.\-?\d{2})?/)[0]
        })

        boundArray.concat(bounds)
        return boundArray.slice(Math.max(boundArray.length - 50, 0))
      })
      .subscribe(boundArray => {
        stream.stop()
        stream.params.locations = boundArray.toString()
        stream.start()
      })

    Rx.Observable.fromEvent(stream, 'tweet').subscribe(
      tweetObject => {
        debug('received message from twitter:', tweetObject)
        ws.send(JSON.stringify(tweetObject), function (err) {
          if (err) {
            console.log('There was an error sending the message');
          }
        });
      }
    )
  });
