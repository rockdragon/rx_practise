import Cycle from '@cycle/core'
import {hJSX} from '@cycle/dom'
import Rx from 'rx'

const vtree$ = Rx.Observable.just(
  <div className="search-field">
    <input type="text"/>
  </div>
)

export default function searchBox(responses) {
  const props$ = responses.props$
  const apiUrl$ = props$.map(props => props['apiUrl']).first()

  var searchQuery$ = apiUrl$.flatMap(apiUrl => {
    return responses.DOM
      .select('.search-field')
      .events('input')
      .debounce(300)
      .map(e => e.target.value)
      .filter(value => value.length > 3)
      .map(searchTerm => apiUrl + searchTerm)
  })

  return {
    DOMTree: vtree$,
    JSONPQuery: searchQuery$
  }
}



