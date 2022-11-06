import axios from 'axios'
const baseUrl = '/api/orders'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async type => {
  const config = {
    headers: { Authorization: token },
    params: { type },
  }

  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = async newObj => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios.post(baseUrl, newObj, config)
  return response.then(response => response.data)
}

export default { getAll, create, setToken }
