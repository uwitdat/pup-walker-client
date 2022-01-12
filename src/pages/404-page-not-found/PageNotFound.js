import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()

  const handleRedirectHome = () => {
    navigate('/')
  }
  return (
    <div>
      404: PAGE NOT FOUND
      <button onClick={handleRedirectHome}>Home</button>
    </div>
  )
}

export default PageNotFound
