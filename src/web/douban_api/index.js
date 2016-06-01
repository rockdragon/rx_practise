import Cycle from '@cycle/core'
import CycleJSONP from '@cycle/jsonp'
import {makeDOMDriver, hJSX, div, input, p} from '@cycle/dom'
import Rx from 'rx'
import RxDOM from 'rx-dom'

function main(responses) {

}

Cycle.run(main, {
  DOM: makeDOMDriver('#container'),
  JSONP: CycleJSONP.makeJSONPDriver()
})
