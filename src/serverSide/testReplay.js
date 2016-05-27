var Rx = require('rx')

var source = Rx.Observable
  .interval(1000)
  .do(x => console.log('Side Effect: ', x))

var published = source.replay(
  x => x.take(3).repeat(3)
  , 2)

published.subscribe(createObserver('SourceA'));
published.subscribe(createObserver('SourceB'));

function createObserver(tag) {
  return Rx.Observer.create(
    function (x) {
      console.log('Next: ' + tag + ': ' + x.toString());
    },
    function (err) {
      console.log('Error: ' + err);
    },
    function () {
      console.log('Completed');
    });
}
