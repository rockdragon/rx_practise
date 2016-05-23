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

quakes.subscribe(quake => {
  var coords = quake.geometry.coordinates
  var size = quake.properties.mag * 10000

  L.circle([coords[1], coords[0]], size).addTo(map)
})