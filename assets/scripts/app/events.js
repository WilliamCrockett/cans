'use strict'

const geolib = require('geolib')

const boatPos = {
  lat: 0,
  long: 0
}

const getPosition = function () {
  console.log('btn click')
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log('position should be next')
    console.log(position.coords.latitude, position.coords.longitude)
    boatPos.lat = position.coords.latitude
    boatPos.long = position.coords.longitude
    console.log(boatPos)

    const markPos = {
      lat: -33.883424,
      long: 18.447654
    }
    const markPos2 = {
      lat: 0,
      long: 0
    }
    const answer = geolib.getRhumbLineBearing(
      {latitude: boatPos.lat, longitude: boatPos.long},
      {latitude: markPos.lat, longitude: markPos.long}
    )
    console.log('show me potato salad', answer)
    $('#markBearing').html(Math.round(answer))

    const answer2 = geolib.getRhumbLineBearing(
      {latitude: boatPos.lat, longitude: boatPos.long},
      {latitude: markPos2.lat, longitude: markPos2.long}
    )
    $('#markBearing2').html(Math.round(answer2))
    console.log('end')
  })
}

const calculateBearing = function () {
  const p1 = {
    x: -33.899928,
    y: 18.463339
  }

  const p2 = {
    x: -33.883424,
    y: 18.447654
  }
  const answer = geolib.getRhumbLineBearing(
    {latitude: "33° 53' 31\" S", longitude: "081° 28' 8\" E"},
    {latitude: "33° 52' 32\" S", longitude: "018° 25' 8\" E"}
  )
  console.log(answer)
}

const addHandlers = () => {
  $('#positionButton').on('click', calculateBearing)
  $('#calcBearing').on('click', getPosition)
}

module.exports = {
  addHandlers
}
