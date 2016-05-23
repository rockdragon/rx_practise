var util = require('util')

function ScError() {
  Error.captureStackTrace(this, MyError);
}
util.inherits(ScError, Error)

var a = new Error('Crap')
var b = new Error('Holy')

console.log(a.name, a.stack)
console.log(b.name, b.stack)
