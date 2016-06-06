var Rx = require('rx')

var source = Rx.Observable.range(0, 3)
  .map(function (x) { return Rx.Observable.range(x, 3); })
  .mergeAll();

var subscription = source.subscribe(
  function (x) {
    console.log('Next: %s', x);
  },
  function (err) {
    console.log('Error: %s', err);
  },
  function () {
    console.log('Completed');
  });

