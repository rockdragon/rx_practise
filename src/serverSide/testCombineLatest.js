var Rx = require('rx')

var source1 = Rx.Observable.interval(100)
  .map(i => 'First: ' + i)

var source2 = Rx.Observable.interval(150)
  .map(i => 'Second: '  + i)

var source = Rx.Observable.combineLatest(
  source1,
  source2
).take(4)

source.subscribe(
  x => console.log('Next %s', JSON.stringify(x)),
  err => console.error(err),
  () => console.log('DONE')
)
