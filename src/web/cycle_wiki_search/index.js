var Cycle = require('@cycle/core');
var CycleDOM = require('@cycle/dom');
var Rx = require('rx');

var MAIN_URL = 'https://en.wikipedia.org';
var WIKI_URL = MAIN_URL + '/wiki/';
var API_URL = MAIN_URL + '/w/api.php?action=query&list=search&format=json&srsearch=';

function main(responses) {
  return {
    DOM: Rx.Observable.just(CycleDOM.h('span', 'Hi there!'))
  }
}

var drivers = {
  DOM: CycleDOM.makeDOMDriver('#container')
};

function vtreeElements(results) {
  var h = CycleDOM.h;
  return h('div', [
    h('h1', 'Wikipedia Search '),
    h('input', {className: 'search-field', attributes: {type: 'text'}}),
    h('hr'),
    h('div', results.map(function(result) {
      return h('div', [
        h('a', { href: WIKI_URL + result.title }, result.title)
      ]);
    }))
  ]);
}

function searchRequest(responses) {
  return responses.DOM.select('.search-field')
    .events('input')
    .debounce(300)
    .map(e => e.target.value)
    .filter(value => value.length > 2)
    .map(search => API_URL + search);
}

Cycle.run(main, drivers);

