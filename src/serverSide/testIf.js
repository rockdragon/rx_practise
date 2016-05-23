var Rx = require('rx')

Rx.Observable.if(
   () => 1 > 2,
   Rx.Observable.range(1, 2),
   Rx.Observable.range(4, 10)
).subscribe(x => console.log(x))