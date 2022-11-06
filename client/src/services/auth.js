import axios from 'axios'
const loginUrl = '/api/login'
const registerUrl = '/api/users'

const login = async user => {
  const request = axios.post(loginUrl, user)
  return request.then(response => response.data)
}

const register = async user => {
  const request = axios.post(registerUrl, user)
  return request.then(response => response.data)
}

export default { login, register }
