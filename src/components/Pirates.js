import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Pirate.css';

class Pirate extends Component {
  
  render(){
    {console.log(this.props.details)}
    return (
      <ul>
      {

        this.props.details.map( (pirate, index) => (
          
          <li key={index}>
          <Link to={`pirates/${pirate._id}`}>{pirate.name}: {index}</Link>
          <button onClick={() => this.props.removePirate(index)}>✖︎</button>
          </li>
          ))
          
        }
        </ul>
        )
      }
    }
    export default Pirate;