var Rx = require('rx')

var a = Rx.Observable.interval(200).map((i) => {
    return 'A' + i
})

var b = Rx.Observable.interval(100).map((i) => {
    return 'B' + i
})

Rx.Observable.merge(a, b)
    .subscribe((x) => {
        console.log(x)
    })