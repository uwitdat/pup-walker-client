import React, { useState } from 'react'
import { auth } from '../../../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const [login, setLogin] = useState({
    email: '',
    password: '',
  })


  const handleLoginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, login.email, login.password)
      navigate('/')
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div>
      <input
        value={login.email}
        onChange={(e) => setLogin({
          ...login,
          email: e.target.value
        })}
        type='email'
        placeholder='email'
      />
      <br />
      <input
        value={login.password}
        onChange={(e) => setLogin({
          ...login,
          password: e.target.value
        })}
        type='text'
        placeholder='password'
      />
      <br />
      <button onClick={handleLoginUser}>Login</button>
    </div>
  )
}

export default Login
