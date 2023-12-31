import axios from 'axios'
const baseUrlAll = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const baseUrlSingle = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getAll = () => {
    const request = axios.get(baseUrlAll)
    return request.then(response => response.data)
}

const getOne = (name) => {
    const request = axios.get(baseUrlAll + name)
    return request.then(response => response.data)
}

export default {
    getAll,
    getOne
}