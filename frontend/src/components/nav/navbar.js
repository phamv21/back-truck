import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar(props) {

    const navLink = props.loggedIn ? (
        <div>
            <h1> loggedin</h1>
            <button onClick={e => {e.preventDefault(); props.logout();}}>Logout</button>
        </div>
    ) :
    (
        <div>
            <h1> loggedout</h1>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
        </div>
    )

  return (
    <div>
        <h1>Navbar </h1>
        {navLink}
    </div>

        
  )
}
