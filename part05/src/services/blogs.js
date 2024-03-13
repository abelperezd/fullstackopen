import axios from 'axios'
const baseUrl = '/api/blogs'

let config = null;

const setToken = newToken => {
  let token = `Bearer ${newToken}`

  config = {
    headers: { Authorization: token },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl, config)
  return request
    .then(response => {
      return response.data
    })
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response)
}

export default { getAll, create, update, remove, setToken }