var Rx = require('rx')

var subject = new Rx.ReplaySubject(null, 200)

setTimeout(_ => subject.onNext(1), 100)
setTimeout(_ => subject.onNext(2), 200)
setTimeout(_ => subject.onNext(3), 300)
setTimeout(_ => {
  subject.subscribe(n => console.log('Received value:', n))
}, 350)