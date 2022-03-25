import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <div>Navbar</div>
    <Link to="/home">home</Link> <br />
    <Link to="/about">about</Link>
    </>
  )
}

export default Navbar