var Rx = require('rx')

var source = Rx.Observable
  .interval(1000)
  .do(x => console.log('Side Effect: ', x))

var a = Rx.Observable.interval(200).map((i) => {
  return 'A' + i
})

var b = Rx.Observable.interval(200).map((i) => {
  return 'B' + i
})

var published = source.replay(
  x => Rx.Observable.merge(a, b).repeat(2)
  , 2)

published.subscribe(createObserver('SourceA'));
published.subscribe(createObserver('SourceB'));

function createObserver(tag) {
  return Rx.Observer.create(
    function (x) {
      console.log('Next: ' + tag + ': ' + x);
    },
    function (err) {
      console.log('Error: ' + err);
    },
    function () {
      console.log('Completed');
    });
}
