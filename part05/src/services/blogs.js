import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  try {
    const request = axios.get(baseUrl)
    console.log("request", request)
    return request.then(response => response.data)
  }
  catch (error) {
    console.log("getAll error: ", error)
  }
}

export default { getAll }