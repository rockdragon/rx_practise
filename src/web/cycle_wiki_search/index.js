import Cycle from '@cycle/core'
import CycleJSONP from '@cycle/jsonp'
import {makeDOMDriver, hJSX, div, input, p} from '@cycle/dom'
import Rx from 'rx'

const MAIN_URL = 'https://en.wikipedia.org'
const WIKI_URL = MAIN_URL + '/wiki/'
const API_URL = MAIN_URL + '/w/api.php?action=query&list=search&format=json&srsearch='

function intent(JSONP) {
  return JSONP.filter(res$ => res$.request.indexOf(API_URL) === 0)
    .concatAll()
    .pluck('query', 'search')
}

function model(actions) {
  return actions.startWith([])
}

function view(state) {
  return state.map(function(linkArray) {
    linkArray = linkArray.map(result => {
      var link = WIKI_URL + result.title;
      return <div><a href={link}>{result.title}</a></div>
    });
    return <div>
      <h1>Wikipedia Search</h1>
      <input className="search-field" type="text" />
      <hr/>
      <div>{linkArray}</div>
    </div>
  })
}

function userIntent(DOM) {
  return DOM.select('.search-field').events('input')
    .debounce(300)
    .map(function(e) { return e.target.value })
    .filter(function(value) { return value.length > 2 })
    .map(function(search) { return API_URL + search });
}

function main(responses) {
  return {
    DOM: view(model(intent(responses.JSONP))),
    JSONP: userIntent(responses.DOM)
  };
}

Cycle.run(main, {
  DOM: makeDOMDriver('#container'),
  JSONP: CycleJSONP.makeJSONPDriver()
})

