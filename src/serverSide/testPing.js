var Rx = require('rx')
var R = require('ramda')
var pingRaw = require('ping')

var config = {
  timeout: 10,
  extra: ["-i 2"],
}
function promisablePing(host) {
  return new Promise((resolve, reject) => {
    pingRaw.sys.probe(host
      , isAlive => isAlive ? resolve(host) : reject(`${host}: unreachable.`)
      , config)
  })
}
function ping(host) {
  return Rx.Observable.create(observer => {
    return promisablePing(host)
      .then(host => observer.onNext(host))
      .then(_ => observer.onCompleted())
      .catch(err => observer.onError(err))
  })
}

var tasks = R.range(1, 199).map(i => ping(`192.168.50.${i}`))
Rx.Observable
  .merge(...tasks)
  .subscribe(
    host => console.log(`pong: ${host}`),
    err => console.error(err)
  )



