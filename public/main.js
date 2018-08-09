let lat = ''
let long = ''

class AddDescriptionLi {
  constructor(content) {
    this.content = content
  }
  displayListResult() {
 let newLi = document.createElement('li')
 newLi.textContent = this.content.weather[0].description.toUpperCase()
 return newLi
  }
}

class AddTempLi {
  constructor(content) {
    this.content = content
  }
  displayListResult() {
 let newLi = document.createElement('li')
 newLi.textContent = Math.ceil(this.content.main.temp) + "°F"
 return newLi
  }
}

class AddIcon {
  constructor(image) {
    this.image = image
  }
  displayIcon(iconClass) {
    document.querySelector(iconClass).style.display = 'flex'
    let weatherIcon = this.image.weather[0].icon
    document.querySelector(iconClass).setAttribute('src', `http://openweathermap.org/img/w/${weatherIcon}.png`)
  }
}

class WeatherApi {
    constructor(searchInput) {
      this.searchInput = searchInput
      this.searchURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput},us&units=imperial&appid=45b731a8be13e595d4c9cca601298e9a`
  }
  getWeatherData (displayList, locationClass, iconClass) {
    fetch(this.searchURL)
      .then(resp => {
        console.log('fetch success')
        if (resp.status === 200) {
          return resp.json()
  
        } else {
          displayErrorMessage(resp)
        }
      })
      .then(json => { 
        document.querySelector(displayList).textContent = ''
        document.querySelector(locationClass).textContent = "Location: " + json.name
        const icon = new AddIcon(json)
        icon.displayIcon(iconClass)
        document.querySelector(displayList).textContent = ''
        parent = document.querySelector(displayList)
        const condition = new AddDescriptionLi(json)
        parent.appendChild(condition.displayListResult())
        const temp = new AddTempLi(json)
        parent.appendChild(temp.displayListResult())
 
      })
    }
}

const getLastLocation = () => {
  lastLocation = localStorage.getItem('zip')
  const weatherSearch = new WeatherApi(lastLocation)
  weatherSearch.getWeatherData('.weather-display3','.location-display3','.weather-icon3')
}

const getCurrentLocation = () => {
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
    newLi.textContent = json.weather[0].description.toUpperCase()
    document.querySelector('.weather-display2').appendChild(newLi)
    // Adds temp in fahrenheit
    newLi = document.createElement('li')
    newLi.textContent = Math.ceil(json.main.temp)+ "°F"
    document.querySelector('.weather-display2').appendChild(newLi)

    })
  // }
}

const searchCityZip = () => {
  input = document.querySelector('.input-bar').value
  localStorage.setItem('zip', input)
  const weatherSearch = new WeatherApi(input)
  weatherSearch.getWeatherData('.weather-display','.location-display','.weather-icon')
}

class AddForecastIcon {
  constructor(image) {
    this.image = image
  }
  displayForecastIcon(iconClass, day) {
    document.querySelector(iconClass).style.display = 'flex'
    let weatherIcon = this.image.list[day].weather[0].icon
    document.querySelector(iconClass).setAttribute('src', `http://openweathermap.org/img/w/${weatherIcon}.png`)
  }
}

class AddForecastDescriptionLi {
  constructor(content) {
    this.content = content
  }
  displayForecastListResult(day) {
 let newLi = document.createElement('li')
 newLi.textContent = this.content.list[day].weather[0].description.toUpperCase()
 return newLi
  }
}

class AddForecastTempLi {
  constructor(content) {
    this.content = content
  }
  displayForecastListResult(day) {
 let newLi = document.createElement('li')
 newLi.textContent = Math.ceil(this.content.list[day].main.temp) + "°F"
 return newLi
  }
}

class WeatherForecastApi {
  constructor(searchInput) {
    this.searchInput = searchInput
    this.searchURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput},us&units=imperial&appid=45b731a8be13e595d4c9cca601298e9a`
}
getForecastData (day, iconClass, listClass, locationClass) {
  fetch(this.searchURL)
    .then(resp => {
      console.log('fetch success')
      if (resp.status === 200) {
        return resp.json()
      } else {
        displayErrorMessage(resp)
      }
    })
    .then(json => { 
        console.log(json.list[0].main.temp)
        console.log(json.list[1].main.temp)
        console.log(json.list[2].main.temp)
        console.log(json.list[3].main.temp)
        console.log(json.list[4].main.temp)
        document.querySelector(listClass).textContent = ''
        document.querySelector(locationClass).textContent = json.city.name + ' - 5 Day Forecast'
        const icon = new AddForecastIcon(json)
        icon.displayForecastIcon(iconClass, 0)
        parent = document.querySelector(listClass)
        const condition = new AddForecastDescriptionLi(json)
        parent.appendChild(condition.displayForecastListResult(day))
        const temp = new AddForecastTempLi(json)
        parent.appendChild(temp.displayForecastListResult(day))

    })
  }
}

const forecast = () => {
  document.querySelector('.main').style.display = 'none'
  document.querySelector('.five-day-forecast').style.display = 'flex'
  input = document.querySelector('.input-bar').value
  const forecastResults = new WeatherForecastApi(input)
  forecastResults.getForecastData(0, '.forecast-1-weather-icon', '.forecast-1-weather-display', '.forecast-location-display')
  forecastResults.getForecastData(1, '.forecast-2-weather-icon', '.forecast-2-weather-display', '.forecast-location-display')
  forecastResults.getForecastData(2, '.forecast-3-weather-icon', '.forecast-3-weather-display', '.forecast-location-display')
  forecastResults.getForecastData(3, '.forecast-4-weather-icon', '.forecast-4-weather-display', '.forecast-location-display')
  forecastResults.getForecastData(4, '.forecast-5-weather-icon', '.forecast-5-weather-display', '.forecast-location-display')
}


const backToFront = () => {

  document.querySelector('.five-day-forecast').style.display = 'none'
  document.querySelector('.main').style.display = 'flex'
}


document.querySelector('.search-button').addEventListener('click', searchCityZip)
document.addEventListener('DOMContentLoaded', getCurrentLocation)
document.addEventListener('DOMContentLoaded', getLastLocation)
document.querySelector('.forecast-button').addEventListener('click', forecast)
document.querySelector('.back-to-front-button').addEventListener('click', backToFront)
