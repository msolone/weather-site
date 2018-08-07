let lat = ''
let long = ''



const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.")
  }
}

const showPosition = (position) => {
  lat = position.coords.latitude
  long = position.coords.longitude
  console.log(lat)
  console.log(long)

// getWeatherFotLatAndLong = (lat, long) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=45b731a8be13e595d4c9cca601298e9a`)
  .then(resp => {
    if (resp.status === 200) {
      return resp.json()

    } else {
      displayErrorMessage(resp)
    }
  })
  .then(json => {
    // Updates location name
    document.querySelector('.weather-display2').textContent = ''
    document.querySelector('.location-display2').textContent = "Location: " + json.name
    // Adds icon for local weather 
    document.querySelector('.weather-icon2').style.display = 'flex'
    weatherIcon = json.weather[0].icon
    document.querySelector('.weather-icon2').setAttribute('src', `http://openweathermap.org/img/w/${weatherIcon}.png`)
    // Adds weather description
    let newLi = document.createElement('li')
    newLi.textContent = json.weather[0].description
    document.querySelector('.weather-display2').appendChild(newLi)
    // Adds temp in fahrenheit
    newLi = document.createElement('li')
    newLi.textContent = json.main.temp + " Degree Fahrenheit"
    document.querySelector('.weather-display2').appendChild(newLi)

    })
  // }
}

const getLastLocation = () => {
  lastLocation = localStorage.getItem('zip')
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${lastLocation},us&units=imperial&appid=45b731a8be13e595d4c9cca601298e9a`)
  .then(resp => {
  if (resp.status === 200) {
    return resp.json()

  } else {
    displayErrorMessage(resp)
  }
})
.then(json => {
  // Updates location name
  document.querySelector('.weather-display3').textContent = ''
  document.querySelector('.location-display3').textContent = "Location: " + json.name
  // Adds icon for local weather 
  document.querySelector('.weather-icon3').style.display = 'flex'
  weatherIcon = json.weather[0].icon
  document.querySelector('.weather-icon3').setAttribute('src', `http://openweathermap.org/img/w/${weatherIcon}.png`)
  // Adds weather description
  let newLi = document.createElement('li')
  newLi.textContent = json.weather[0].description
  document.querySelector('.weather-display3').appendChild(newLi)
  // Adds temp in fahrenheit
  newLi = document.createElement('li')
  newLi.textContent = json.main.temp + " Degree Fahrenheit"
  document.querySelector('.weather-display3').appendChild(newLi)


})
}






const searchWeather = () => {
  input = document.querySelector('.input-bar').value
  localStorage.setItem('zip', input)
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input},us&units=imperial&appid=45b731a8be13e595d4c9cca601298e9a`)
    .then(resp => {
      if (resp.status === 200) {
        return resp.json()

      } else {
        displayErrorMessage(resp)
      }
    })
    .then(json => {
      // Updates location name
      document.querySelector('.weather-display').textContent = ''
      document.querySelector('.location-display').textContent = "Location: " + json.name
      // Adds icon for local weather 
      document.querySelector('.weather-icon').style.display = 'flex'
      weatherIcon = json.weather[0].icon
      document.querySelector('.weather-icon').setAttribute('src', `http://openweathermap.org/img/w/${weatherIcon}.png`)
      // Adds weather description
      let newLi = document.createElement('li')
      newLi.textContent = json.weather[0].description
      document.querySelector('.weather-display').appendChild(newLi)
      // Adds temp in fahrenheit
      newLi = document.createElement('li')
      newLi.textContent = json.main.temp + " Degree Fahrenheit"
      document.querySelector('.weather-display').appendChild(newLi)


    })
}



document.querySelector('.search-button').addEventListener('click', searchWeather)
document.addEventListener('DOMContentLoaded', getLocation)
document.addEventListener('DOMContentLoaded', getLastLocation)