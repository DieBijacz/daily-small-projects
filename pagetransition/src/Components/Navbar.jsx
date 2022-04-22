import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <div className="navbar">
      <div className="logo" onClick={() => navigate('/')}>MASTA DEVELOPMENT</div>
      <div className="links">
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/profile'>Profile</Link>
      </div>
    </div>
  )
}

export default Navbar