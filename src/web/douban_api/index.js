import Cycle from '@cycle/core'
import CycleJSONP from '@cycle/jsonp'
import {makeDOMDriver, hJSX} from '@cycle/dom'
import {makeHTTPDriver} from '@cycle/http'
import {makeJSONPDriver} from '@cycle/jsonp'
import Rx from 'rx'

const GITHUB_SEARCH_URL = 'https://api.github.com/search/repositories?q='

function main(responses$) {
  const search$ = responses$.DOM.select('input[type="button"]')
    .events('click')
    .map(_ => {
      return {url: GITHUB_SEARCH_URL}
    })

  const text$ = responses$.DOM.select('input[type="text"]')
    .events('input')
    .map(e => {
      return {keyword: e.target.value}
    })

  const http$ = Rx.Observable.merge(text$, search$)
    .reduce((prev, next) => {
      const state = Object.assign({}, prev, next)
      if(next.url)
        state.url = next.url + state.keyword
      else if(next.keyword)
        state.url = null
      return state
    })
    .map(state => {
      return {
        url: state.url,
        method: 'GET'
      }
    })

  const dom$ = responses$.HTTP
    .filter(res$ => {
      return res$.request.url && res$.request.url.startsWith(GITHUB_SEARCH_URL)
    })
    .mergeAll()
    .map(res => res.text)
    .startWith('Loading...')
    .map(JSON => {
        return <div>
          <input type="text"/>
          <input type="button" value="search"/>
          <br/>
          <span>
            {JSON}
          </span>
        </div>
      }
    )

  return {
    DOM: dom$,
    HTTP: http$
  }
}

const driver = {
  DOM: makeDOMDriver('#container'),
  HTTP: makeHTTPDriver(),
}

Cycle.run(main, driver)
