var Rx = require('rx')

var delayedRange = Rx.Observable.range(0, 5).delay(1000)
var subject = new Rx.AsyncSubject()

delayedRange.subscribe(subject)

subject.subscribe(
  item => console.log('Value:', value),
  err => console.error(err),
  () => console.log('compeleted')
)
