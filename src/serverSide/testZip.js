var Rx = require('rx')

var range = Rx.Observable.range(0, 5);

var source = Rx.Observable.zip(
  range,
  range.skip(1),
  range.skip(2)
);

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
