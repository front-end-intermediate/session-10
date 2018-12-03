import React from 'react';
import {NavLink} from 'react-router-dom';
import '../assets/css/Nav.css'

function Nav(){
  return (
    <ul className="nav">
      <li>
        <NavLink exact to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink to='/add'>About Pirates</NavLink>
      </li>
      <li>
        <NavLink to='/pirates'>Pirates</NavLink>
      </li>
    </ul>
  )
}

export default Nav