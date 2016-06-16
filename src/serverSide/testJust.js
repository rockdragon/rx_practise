var Rx = require('rx')

Rx.Observable.just({a :10})
  .subscribe(x => console.log('from', x))