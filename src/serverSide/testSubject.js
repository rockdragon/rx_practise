var Rx = require('rx')

var observable = new Rx.Subject()

observable.subscribe(
  res => console.log(res)
)
observable.onNext('subscribe')
observable.onNext('by')
observable.dispose()
if(!observable.isDisposed)
  observable.onNext('self')

