import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`

  config = {
    headers: { Authorization: token },
  }
}

const getAll = () => {
  console.log("conf", config)
  const request = axios.get(baseUrl, config)
  console.log("request", request)
  return request
    .then(response => {
      return response.data
    })
}

const create = async newObject => {
  console.log(config)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }