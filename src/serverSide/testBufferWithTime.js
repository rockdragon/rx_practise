var Rx = require('rx')

var source = Rx.Observable.interval(100)
  .bufferWithTime(500)
  .take(3);

var subscription = source.subscribe(
  x => console.log('Next: ', x),
  err => console.error(err),
  _ => console.log('DONE')
)
