import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Alert from '../components/Alert'
import authService from '../services/auth'

const Register = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState(null)

  const navigate = useNavigate()

  const clearInputs = () => {
    setName('')
    setUsername('')
    setPassword('')
  }

  const handleRegister = async e => {
    e.preventDefault()
    try {
      await authService.register({ name, username, password })
      clearInputs()
      setAlert({
        message:
          'Your account has been successfully created. Redirecting to Login...',
        type: 'success',
      })
      setTimeout(() => navigate('/login'), 2600)
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
          <form className="card-body w-96" onSubmit={handleRegister}>
            <h1 className="text-xl mb-3">Register</h1>
            <Alert alert={alert} />
            <input
              placeholder="Name"
              className="input input-bordered mb-3"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              placeholder="Username"
              className="input input-bordered mb-3"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoCapitalize="off"
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered mb-3"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="divider mt-6">or</div>
        <Link to="/login" className="link link-primary link-hover">
          LOGIN
        </Link>
      </div>
    </div>
  )
}

export default Register
