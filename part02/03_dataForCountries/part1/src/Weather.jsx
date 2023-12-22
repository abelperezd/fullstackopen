import { useState, useEffect } from 'react'
import weatherService from './services/weatherService';

const Weather = ({ country }) => {

  console.log("Country in weather: ", country)

  /*const [country, setCountry] = useState(val)*/

  const [weatherData, setWeatherData] = useState(null)

  /*
  if (val != null)
    setCountry(val)
*/

  const getWeatherData = () => {
    weatherService.getWeather(country)
      .then(data => {
        console.log(data)
        setWeatherData(data)
      })
      .catch(error => console.log(error))
  }

  useEffect(getWeatherData, [country])

  /*console.log("wd: ", weatherData)*/

  if (weatherData == null) {
    return (<></>)
  }

  return (
    <div>
      <h3>Weather in {country}</h3>
      <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
      <p>{weatherData.weather[0].main}</p>
      <p><b>Temperature: </b> {(weatherData.main.temp - 273).toFixed(2)} ºC</p>
      <p><b>Humidity: </b> {(weatherData.main.humidity)}%</p>
      <p><b>Wind: </b> {(weatherData.wind.speed).toFixed(2)} m/s</p>
    </div>
  )

}

export default Weather