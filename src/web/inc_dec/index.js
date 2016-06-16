import Cycle from '@cycle/core'
import CycleJSONP from '@cycle/jsonp'
import {makeDOMDriver, hJSX} from '@cycle/dom'
import Rx from 'rx'
import RxDOM from 'rx-dom'

function main(sources) {
  const decrement$ = sources.DOM
    .select('.decrement').events('click')
    .map(c => -1)
  const increment$ = sources.DOM
    .select('.increment').events('click')
    .map(c => +1)
  const count$ = increment$.merge(decrement$)
    .scan((x, y) => x + y)
    .startWith(0)
  const vtree$ = count$.map(count =>
    <div>
      <input type="button" className="decrement" value=" - " />
      <input type="button" className="increment" value=" + "/>
      <div>
        Clicked {count} times~
      </div>
    </div>)
  return {
    DOM: vtree$
  }
}

Cycle.run(main, {
  DOM: makeDOMDriver('#container'),
})

