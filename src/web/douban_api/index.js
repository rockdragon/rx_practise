import Cycle from '@cycle/core'
import CycleJSONP from '@cycle/jsonp'
import {makeDOMDriver, hJSX} from '@cycle/dom'
import {makeHTTPDriver} from '@cycle/http'
import Rx from 'rx'

const HELLO_URL = 'http://www.baidu.com/'

function model(actions$) {
  return Rx.Observable.combineLatest(
    actions$.inputs$.startWith(''),
    actions$.clicks$.startWith(false).scan((prev, next) => {
      let request$ = Rx.Observable.just({url: HELLO_URL})

      return !prev
    }),
    (inputs, clicks) => {
      return {inputs, clicks}
    }
  )
}
function view(state$) {
  return state$.map((value, index) => {
    console.log(value, index)
      return <div>
        <input type="text"/>
        <input type="button" value="search"/>
        <br/>
      </div>
    }
  )
}
function intent(sources$) {
  return {
    inputs$: sources$.DOM.select('input[type="text"]')
      .events('input')
      .map(ev => ev.target.value),
    clicks$: sources$.DOM.select('input[type="button"]')
      .events('click')
  }
}

function main(responses$) {
  return {
    DOM: view(model(intent(responses$)))
  }
}

const driver = {
  DOM: makeDOMDriver('#container'),
  HTTP: makeHTTPDriver(),
}

Cycle.run(main, driver)
