import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import Alert from '../components/Alert'
import authService from '../services/auth'
import { userActions } from '../store/user-slice'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const user = await authService.login({ username, password })
      dispatch(userActions.add(user))
      navigate('/', { replace: true })
    } catch (err) {
      setAlert({
        message: err.response.data.error || 'Something want wrong!',
        type: 'error',
      })
    }
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col card shadow-xl">
          <form className="card-body w-96" onSubmit={handleLogin}>
            <h1 className="text-xl mb-3">Login</h1>
            <Alert alert={alert} />
            <input
              placeholder="Username"
              className="input input-bordered mb-3"
              value={username}
              onChange={handleUsernameChange}
              required
              autoFocus
              autoCapitalize="off"
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered mb-3"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button className="btn btn-primary">Login</button>
          </form>
        </div>
        <div className="divider mt-6">or</div>
        <Link to="/register" className="link link-primary link-hover">
          REGISTER
        </Link>
      </div>
    </div>
  )
}

export default Login
