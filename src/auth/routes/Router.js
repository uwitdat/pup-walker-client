import React, { useState } from 'react'
import { UserContext } from '../../hooks/context/UserContext';
import {
  Routes,
  Route
} from "react-router-dom";
import Dashboard from '../../pages/dashboard/Dashboard';
import Login from '../../pages/auth/login/Login';
import Signup from '../../pages/auth/signup/Signup';
import RequireAuth from './RequireAuth';
import PageNotFound from '../../pages/404-page-not-found/PageNotFound';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const Router = () => {

  const [user, setUser] = useState(null)

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  return (
    <UserContext.Provider value={{ user, setUser }} >
      <Routes>

        {/*========= PROTECTED ROUTES ==========*/}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        {/*=====================================*/}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </UserContext.Provider>
  )
}

export default Router
