import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Pirate.css'

class Pirate extends Component {
  
  render(){
    const { details } = this.props;
    return (
      <React.Fragment>
        <p>Pirate</p>
          <Link to={`pirates/${details._id}`}>{details.name}</Link> 
          <li><button onClick={() => this.props.removePirate(this.props.index)}>✖︎</button></li>
        </React.Fragment>
      )
    }
  }
  export default Pirate;