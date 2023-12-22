import axios from 'axios'

const key = import.meta.env.VITE_WEATHER_KEY;

const getWeather = (country) => {
    console.log("url:", `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${key}`)
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${key}`)
    return request.then(response => response.data)
}

const getIcon = (id) => {
    console.log("url weather:", `https://openweathermap.org/img/wn/${id}@2x.png`)
    const request = axios.get(`https://openweathermap.org/img/wn/${id}@2x.png`)
    return request.then(response => response.data)
}

export default {
    getWeather,
    getIcon
}