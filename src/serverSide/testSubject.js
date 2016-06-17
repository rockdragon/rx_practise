var Rx = require('rx')

function NumberObject(n) {
  this.n = n
  this.subject = new Rx.Subject()
}
NumberObject.prototype.subject = function getter() {
  return this.subject
}

NumberObject.prototype.set = function setter(n) {
  this.n = n
  this.subject.onNext(n)
}

var numberObj = new NumberObject(10)
numberObj.subject.subscribe(x => console.log('x changed:', x))

numberObj.set(20)
numberObj.set(30)
numberObj.set(40)
numberObj.set(50)



