const Rx = require('rx')
const print = console.log

function RuralSubject(n) {
  this.n = n
  this.subject = new Rx.Subject()
}
RuralSubject.prototype.subject = function getter() {
  return this.subject
}

RuralSubject.prototype.set = function setter(n) {
  this.n = n
  this.subject.onNext(n)
}

const numberObj = new RuralSubject('Hola')
numberObj.subject.subscribe(
  x => print('peasant is comming:', x)
)

numberObj.set('Buenos días')
numberObj.set('Buenas tardes')
numberObj.set('Buenas noches')
numberObj.set('Hasta luego')




