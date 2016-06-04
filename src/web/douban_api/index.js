import Cycle from '@cycle/core'
import CycleJSONP from '@cycle/jsonp'
import {makeDOMDriver, hJSX} from '@cycle/dom'
import {makeHTTPDriver} from '@cycle/http'
import {makeJSONPDriver} from '@cycle/jsonp'
import Rx from 'rx'

const GITHUB_SEARCH_URL = 'https://api.github.com/search/repositories?q='
const buffer = {}

function main(responses$) {
  const search$ = responses$.DOM.select('input[type="button"]')
    .events('click')
    .map(() => {
      return buffer.keyword ? {
        url: GITHUB_SEARCH_URL + encodeURI(buffer.keyword),
        method: 'GET'
      } : null
    })
    .catch(err => Rx.Observable.just(err))

  const text$ = responses$.DOM.select('input[type="text"]')
    .events('input')
    .map(e => {
      return {keyword: e.target.value}
    })

  const http$ = responses$.HTTP
    .filter(res$ => {
      return res$.request.url && res$.request.url.startsWith(GITHUB_SEARCH_URL)
    })
    .mergeAll()
    .map(res => {
      return {response: res.text}
    })

  const dom$ = Rx.Observable.merge(text$, http$)
    .startWith({
      keyword: '',
      response: 'Loading...'
    })
    .scan((prev, next) => {
      const state = Object.assign({}, prev)
      if (next.keyword) {
        buffer.keyword = state.keyword = next.keyword
      } else if (next.response) {
        state.response = next.response
      }
      return state
    })
    .map(state => {
        return <div>
          <input type="text"/>
          <input type="button" value="search"/>
          <br/>
          <span>
            {state.response}
          </span>
        </div>
      }
    )

  return {
    DOM: dom$,
    HTTP: search$
  }
}

const driver = {
  DOM: makeDOMDriver('#container'),
  HTTP: makeHTTPDriver(),
}

Cycle.run(main, driver)
