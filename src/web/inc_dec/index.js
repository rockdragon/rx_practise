import Cycle from '@cycle/core'
import { makeDOMDriver, hJSX } from '@cycle/dom'

function main({ DOM }) {
  const decrement$ = DOM.select('.decrement').events('click').map(_ => -1)
  const increment$ = DOM.select('.increment').events('click').map(_ => +1)
  const count$ = increment$.merge(decrement$)
    .scan((x, y) => x + y)
    .startWith(0)
  return {
    DOM: count$.map(count =>
      <div>
        <input type="button" className="decrement" value=" - "/>
        <input type="button" className="increment" value=" + "/>
        <div>
          Clicked {count} times~
        </div>
      </div>
    )
  }
}

Cycle.run(main, {
  DOM: makeDOMDriver('#container'),
})

