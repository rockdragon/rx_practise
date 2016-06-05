var Rx = require('rx')

Rx.Observable.from([[1, 2, 3], [4, 5, 6]])
  .flatMap(x => x)
  .subscribe(x => console.log(x))
