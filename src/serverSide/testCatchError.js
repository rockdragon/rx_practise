var Rx = require('rx')

function getJSON(arr) {
  return Rx.Observable.from(arr).map(str => {
    var parsedJSON = JSON.parse(str)
    return parsedJSON
  })
}

getJSON([
  '{"1": 1, "2": 2}',
  '{"success: true}', // Invalid JSON string
  '{"enabled": true}'
]).subscribe(
  (json) => console.log('Parsed JSON: ', json),
  (err) => console.error(err)
)
