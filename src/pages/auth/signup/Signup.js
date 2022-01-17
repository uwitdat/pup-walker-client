import React, { useState, useContext } from 'react';
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebaseConfig';
import { UserContext } from '../../../hooks/context/UserContext';

const Signup = () => {
  let navigate = useNavigate();

  const [register, setRegister] = useState({
    email: '',
    password: '',
    confirmPassord: ''
  })

  const { user } = useContext(UserContext)

  console.log('USER ==>', user)


  const handleRegisterUser = async () => {
    if (register.password !== register.confirmPassord) {
      console.log('passwords dont match') // TODO: output error message to screen
    } else {
      try {
        await createUserWithEmailAndPassword(auth, register.email, register.password)
        navigate('/')
      } catch (err) {
        console.log(err.message)
      }
    }
  }

  const handleUserSignOut = async () => {
    signOut(auth)
    navigate('/login')
  }

  return (
    <div>
      <input
        value={register.email}
        onChange={(e) => setRegister({
          ...register,
          email: e.target.value
        })}
        type='email'
        placeholder='email'
      />
      <br />
      <input
        value={register.password}
        onChange={(e) => setRegister({
          ...register,
          password: e.target.value
        })}
        type='text'
        placeholder='password'
      />
      <br />
      <input
        value={register.confirmPassord}
        onChange={(e) => setRegister({
          ...register,
          confirmPassord: e.target.value
        })}
        type='text'
        placeholder='confirm password'
      />
      <br />
      <button onClick={handleRegisterUser}>Sign Up</button>
      <p>Currently signed in: {user ? user.email : 'none'}</p>
      <button onClick={handleUserSignOut}>Sign out</button>
    </div>
  )
}

export default Signup
