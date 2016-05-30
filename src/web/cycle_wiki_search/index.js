import Cycle from '@cycle/core'
import {makeDOMDriver, hJSX, div, input, p} from '@cycle/dom'
import Rx from 'rx'

const MAIN_URL = 'https://en.wikipedia.org'
const WIKI_URL = MAIN_URL + '/wiki/'
const API_URL = MAIN_URL + '/w/api.php?action=query&list=search&format=json&srsearch='

function get(id) {
  return document.getElementById(id)
}

function main(drivers) {
  return {
    DOM: drivers.DOM.select('input[type="radio"]').events('click')
      .map(ev => ev.target.value)
      .startWith('')
      .map(selected =>
        <div>
          <form>
            <input type="radio" name="radios" value="1"/> 1
            <input type="radio" name="radios" value="2"/> 2
          </form>
          <p>{selected}</p>
        </div>
      )
  }
}

var drivers = {
  DOM: makeDOMDriver('#container')
}

function vtreeElementsJSX(results) {
  results = results.map(function (result) {
    var link = WIKI_URL + result.title;
    return <div><a href={link}>{result.title}</a></div>
  })
  return <div>
    <h1>Wikipedia Search</h1>
    <input className="search-field" type="text"/>
    <hr/>
    <div>{results}</div>
  </div>
}

function searchRequest(responses) {
  return responses.DOM.select('.search-field')
    .events('input')
    .debounce(300)
    .map(e => e.target.value)
    .filter(value => value.length > 2)
    .map(search => API_URL + search)
}

Cycle.run(main, drivers)

