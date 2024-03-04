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
  try {

    console.log("conf", config)
    const request = axios.get(baseUrl, config)
    console.log("request", request)
    return request.then(response => response.data)
  }
  catch (error) {
    console.log("getAll error: ", error)
  }
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }