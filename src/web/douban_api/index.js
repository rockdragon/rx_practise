import Cycle from '@cycle/core'
import CycleJSONP from '@cycle/jsonp'
import {makeDOMDriver, hJSX} from '@cycle/dom'
import {makeHTTPDriver} from '@cycle/http'
import {makeJSONPDriver} from '@cycle/jsonp'
import Rx from 'rx'

const GITHUB_SEARCH_URL = 'https://api.github.com/search/repositories?q='

function model(actions$) {
  return Rx.Observable
    .merge(actions$.text$, actions$.button$, actions$.http$)
    .startWith({
      keyword: '',
      request: null,
      response: 'Loading...'
    })
    .scan((prev, next) => {
      console.log('trigged scan...', next)
      const state = Object.assign({}, prev)
      if (typeof next === 'function') {
        console.log('keyword', state.keyword)
        state.request = next(state.keyword)
      } else if (next.keyword) {
        state.keyword = next.keyword
        state.request = null
      } else if (next.response) {
        state.request = null
        state.response = next.response
      }

      return state
    })
}
function view(state$) {
  console.log('---->>>>', state$.pluck('request'))
  return {
    DOM: state$
      .filter(state => {
        console.log('DOM')
        return state.request === null
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
      ),
    HTTP: state$
      .filter(state => {
        console.log('HTTP')
        return state.request !== null
      })
      .map(state => {
        return {
          url: state.request,
          method: 'GET'
        }
      })
      .take(1)
  }
}
function intent(responses$) {
  return {
    text$: responses$.DOM.select('input[type="text"]')
      .events('input')
      .map(e => {
        return {keyword: e.target.value}
      }),
    button$: responses$.DOM.select('input[type="button"]')
      .events('click')
      .map(_ => keyword => GITHUB_SEARCH_URL + encodeURI(keyword)),
    http$: responses$.HTTP
      .filter(res$ => {
        return res$.request.url && res$.request.url.startsWith(GITHUB_SEARCH_URL)
      })
      .mergeAll()
      .map(res => {
        return {response: res.text}
      })
  }
}

function main(responses$) {
  return view(model(intent(responses$)))
}

const driver = {
  DOM: makeDOMDriver('#container'),
  HTTP: makeHTTPDriver(),
  //JSONP: makeJSONPDriver(),
}

Cycle.run(main, driver)
