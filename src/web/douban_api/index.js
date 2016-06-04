import Cycle from '@cycle/core'
import CycleJSONP from '@cycle/jsonp'
import {makeDOMDriver, hJSX} from '@cycle/dom'
import {makeHTTPDriver} from '@cycle/http'
import Rx from 'rx'

const HELLO_URL = 'https://www.baidu.com/s?wd='

function model(actions$) {
  return Rx.Observable
    .merge(actions$.inputs$, actions$.clicks$)
    .startWith({
      keyword: '', request: {
        url: HELLO_URL,
        method: 'GET'
      }
    })
    .scan((prev, next) => {
      const state = Object.assign({}, prev)
      if (typeof next === 'string') {
        state.keyword = next
        state.request = undefined
      }
      else if (typeof next === 'function')
        state.request = next(state.keyword)
      return state
    })
}
function view(state$) {
  return {
    DOM: state$.map((value) => {
        return <div>
          <input type="text"/>
          <input type="button" value="search"/>
          <br/>
        </div>
      }
    ),
    HTTP: state$.map(value => value.request)
  }
}
function intent(sources$) {
  return {
    inputs$: sources$.DOM.select('input[type="text"]')
      .events('input')
      .map(ev => ev.target.value),
    clicks$: sources$.DOM.select('input[type="button"]')
      .events('click')
      .map(_ => keyword => {
        return {
          url: HELLO_URL + keyword,
          method: 'GET'
        }
      })
  }
}

function main(responses$) {
  return view(model(intent(responses$)))
}

const driver = {
  DOM: makeDOMDriver('#container'),
  HTTP: makeHTTPDriver(),
}

Cycle.run(main, driver)
