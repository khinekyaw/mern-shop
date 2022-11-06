import axios from 'axios'
const baseUrl = '/api/products'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const get = async id => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const create = async newObj => {
  const config = {
    headers: { Authorization: token },
  }

  const response = axios.post(baseUrl, newObj, config)
  return response.then(response => response.data)
}

export default { get, getAll, create, setToken }
