var Rx = require('rx')

var interval = Rx.Observable.interval(1000)

var source = interval
  .take(5)
  .do(x => console.log('Side Effeact', x))

function createObserver(tag) {
  return Rx.Observer.create(
    x => console.log(tag + ' : ' + x),
    err => console.error(err),
    _ => console.log('DONE')
  )
}

var published = source.publish()

source.subscribe(createObserver('SourceA'))
source.subscribe(createObserver('SourceB'))

published.connect();
