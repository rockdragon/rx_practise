import Cycle from '@cycle/core'
import CycleJSONP from '@cycle/jsonp'
import {makeDOMDriver, hJSX} from '@cycle/dom'
import {makeHTTPDriver} from '@cycle/http'
import Rx from 'rx'

function model(input$) {
  return input$
}
function view(state$) {
  return state$.map(value =>
    <div>
      <input type="text"/>
      <input type="button" value="search"/>
      <span>{value}</span>
    </div>
  )
}
function intent(sources$) {
    const inputs$ = sources$.DOM.select('input[type="text"]')
    .events('input')
    .map(ev => ev.target.value)
  const clicks$ =  sources$.DOM.select('input[type="text"]')
    .events('click')
    .map(ev => 1)
  return Rx.Observable.combineLatest(
    inputs$.startWith('')
    , clicks$.startWith('')
    , (inputs, clicks) => {
      console.log(inputs, clicks)
      return {inputs, clicks}
    }
  )
}

function main(responses$) {
  return {
    DOM: view(model(intent(responses$)))
  }
}

const driver = {
  DOM: makeDOMDriver('#container'),
}

Cycle.run(main, driver)
