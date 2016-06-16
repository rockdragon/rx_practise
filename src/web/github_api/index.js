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

  const http$ = search$.withLatestFrom(text$, (search, text)=> {
      return search.url + text.keyword
    })
    .map(state => {
      return {
        url: state,
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
