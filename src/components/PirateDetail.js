import React from 'react';
import { Link } from 'react-router-dom'

const PirateDetail = (props) => {

const pirate = props.details.filter(
  p => p._id === props.match.params.number
  // p => p.name === 'Gary Glitter' 
  )
  
  console.log(pirate[0])
  
  return (
    <div className='pirate'>
    <ul>
    <li>{pirate[0].name}</li>
    <li>{pirate[0].vessel}</li>
    <li>{pirate[0].weapon}</li>
    </ul>
    <Link to='/'>Back</Link>
    </div>
    )
  }
  
  export default PirateDetail