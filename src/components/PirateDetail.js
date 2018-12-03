import React from 'react'
import { Link } from 'react-router-dom'

const PirateDetail = (props) => (
  <div className='pirate'>
  <ul>
      <li>{props.details.name}</li>
  </ul>
  <Link to='/pirates'>Back</Link>
  </div>
)

export default PirateDetail