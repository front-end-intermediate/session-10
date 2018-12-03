import React from 'react';
import { Link } from 'react-router-dom'

const PirateDetail = (props) => {

const pirate = props.details.filter(
  p => p._id === props.match.params.number
  )
  
  const pirateDeet = pirate[0];
  
  return (
    <div className='pirate'>
    <ul>
    <li>Name: {pirateDeet.name}</li>
    <li>Vessel: {pirateDeet.vessel}</li>
    <li>Weapon: {pirateDeet.weapon}</li>
    </ul>
    <Link to='/pirates'>Back</Link>
    </div>
    )
  }
  
  export default PirateDetail