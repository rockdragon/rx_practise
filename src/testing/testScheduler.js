var assert = require('assert')
var Rx = require('rx')
var onNext = Rx.ReactiveTest.onNext
var onCompleted = Rx.ReactiveTest.onCompleted
var subscribe = Rx.ReactiveTest.subscribe

var print = console.log
var scheduler = new Rx.TestScheduler()

var quakes = scheduler.createHotObservable(
  onNext(100, {properties: 1}),
  onNext(300, {properties: 2}),
  onNext(550, {properties: 3}),
  onNext(750, {properties: 4}),
  onNext(1000, {properties: 5}),
  onCompleted(1100)
)

function quakeBatches(scheduler, quakes) {
  return quakes.pluck('properties')
    .bufferWithTime(500, null, scheduler || null)
    .filter(function (rows) {
      return rows.length > 0;
    });
}

var results = scheduler.startScheduler(
  _ => quakeBatches(scheduler, quakes),
  {created: 0, subscribed: 0, disposed: 1200}
)

var messages = results.messages
print(results.scheduler === scheduler)

assert.equal(
  messages[0].toString(),
  onNext(501, [1, 2].toString())
)

assert.equal(
  messages[1].toString(),
  onNext(1001, [3, 4, 5]).toString()
)

assert.equal(
  messages[2].toString(),
  onCompleted(1100).toString()
)