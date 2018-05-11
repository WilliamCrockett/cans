'use strict'

const geolib = require('geolib')
const marks = require('./marks')

let inputTwd = 0

const boatPos = {
  lat: 0,
  long: 0
}

const markPos = {
  lat: -33.883424,
  long: 18.447654
}
const markPos2 = {
  lat: 0,
  long: 0
}

const markPos3 = { // Paarden Eiland
  lat: -33.90655,
  long: 18.46816666666667
}

const getPosition = function () {
  console.log('btn click')
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log('position should be next')
    console.log(position.coords.latitude, position.coords.longitude)
    boatPos.lat = position.coords.latitude
    boatPos.long = position.coords.longitude
    console.log(boatPos)

    const answer = geolib.getRhumbLineBearing( // extend to use marks from marks.js
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

// Testing
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

const showPage1 = function () {
  $('.table-p-1').css('display', 'block')
  $('.table-p-2').css('display', 'none')
}

const showPage2 = function () {
  $('.table-p-2').css('display', 'block')
  $('.table-p-1').css('display', 'none')
}

const moveToTop = function () {
  console.log('hello')
}

const setMarkInfo = function () {
  console.log('sup cracker')
  const courseToMake = geolib.getRhumbLineBearing(
    {latitude: markPos.lat, longitude: markPos.long},
    {latitude: markPos3.lat, longitude: markPos3.long}
  )

  const distanceToMark = geolib.getDistance(
    {latitude: markPos.lat, longitude: markPos.long},
    {latitude: markPos3.lat, longitude: markPos3.long}
  )

  const twa = courseToMake - inputTwd

  const distanceAsNm = (distanceToMark / 1852).toFixed(2)


  console.log('ctm is', courseToMake)
  console.log('distance is', distanceToMark)
  console.log('TWA is', twa)
  console.log('distanceAsNm is', distanceAsNm)
  $('#twaBetweenMarks').html(Math.floor(twa))
  $('#ctmBetweenMarks').html(Math.floor(courseToMake))
  $('#distanceToMake').html(distanceAsNm)
}

const setTwd = function () {
  const tmp = $('#twd').val()
  if (!tmp) {
    alert('cannot be emtpy. please enter a value between 0 and 360')
  }
  if (tmp > 360 || tmp < 0) {
    alert('must be between 0 and 360')
  } else {
    inputTwd = tmp
    $('#currentTWD').html(inputTwd)
    $('#twd').val('')
  }
  console.log(inputTwd)
}

const addHandlers = () => {
  // $('#positionButton').on('click', calculateBearing)
  $('#calcBearing').on('click', getPosition)
  $('#page1').on('click', showPage1)
  $('#page2').on('click', showPage2)
  $('#markOne').on('click', moveToTop) // extend this, dynmically TODO
  $('#setMarkInfo').on('click', setMarkInfo)
  $('#setTwd').on('click', setTwd)
}

module.exports = {
  addHandlers
}
