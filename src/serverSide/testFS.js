var Rx = require('rx')
var fs = require('fs')

var readdir = Rx.Observable.fromNodeCallback(fs.readdir)

var source = readdir('../')

var subscription = source.subscribe(
    function(res) { console.log('List of directories: ' + res) },
    function(err) { console.error(err) },
    function() { console.log('DONE') }
)