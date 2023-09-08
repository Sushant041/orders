import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  
  const token = localStorage.getItem("token");
  const [login, setLogin] = useState(token ? true : false);
  
  const logout = () => {
    localStorage.removeItem("token");
    setLogin(false); 
  };
  
  return (
    <div className='sticky-top'>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Orders</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/yourorder">Your Orders</Link>
        </li>
      </ul>
      <div>
     {!login && <Link className='btn mx-2' style={{background: "green", color: "white"}} to="/login" onClick={() => setLogin(true)}>Login</Link>
      }  
       { !login && 
       <Link className='btn mx-2' style={{background: "green", color: "white"}} to="/signup" onClick={() => setLogin(true)}>signup</Link>
       }

          {login &&
            <Link className='btn mx-2' style={{background: "red", color: "white"}} onClick={() => logout()}>Logout</Link>
            }
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}
