function initialize() {
  var quakes = Rx.Observable
    .interval(500)
    .flatMap(() => {
      return Rx.DOM.jsonpRequest({
        url: QUAKE_URL,
        jsonpCallback: 'eqfeed_callback'
      }).retry(3)
    })
    .flatMap(result => {
      return Rx.Observable.from(result.response.features)
    })
    .distinct(quake => quake.properties.code)
    .share()

  quakes.subscribe(quake => {
    var coords = quake.geometry.coordinates
    var size = quake.properties.mag * 10000

    L.circle([coords[1], coords[0]], size).addTo(map)
  })

  var table = document.getElementById('quakes_info')
  quakes
    .pluck('properties')
    .map(makeRow)
    .subscribe(row => table.appendChild(row))
}

Rx.DOM.ready().subscribe(initialize)

function makeRow(props) {
  var row = document.createElement('tr');
  row.id = props.net + props.code;

  var date = new Date(props.time);
  var time = date.toString();
  [props.place, props.mag, time].forEach(text => {
    var cell = document.createElement('td');
    cell.textContent = text;
    row.appendChild(cell);
  })
  return row
}