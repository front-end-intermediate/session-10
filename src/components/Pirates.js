import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Pirate.css';

class Pirate extends Component {
  
  render(){
    // const { details } = this.props.details;
    return (
      <ul>
      {
        // this.props.details &&
        this.props.details.map( p => (
          
          <li key={p._id}>
          <Link to={`pirates/${p._id}`}>{p.name}</Link>
          <button onClick={() => this.props.removePirate(p._id)}>✖︎</button>
          </li>
          ))
          
        }
        </ul>
        )
      }
    }
    export default Pirate;