var Rx = require('rx')

Rx.Observable
    .range(1, 20)
    .scan((acc, x) => {
        var a = acc
        if (!Array.isArray(a)) a = [a]
        return a.concat(x)
    })
    .subscribe((x) => {
        console.log(x)
    })

