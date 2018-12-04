import React, { Component } from 'react';
import Pirate from './Pirate'
import '../assets/css/Pirate.css';

class Pirates extends Component {
  
  render(){
    return (
      <div className='pirate'>
      <ul>
        {
          Object.keys(this.props.details).map( key => (
            <Pirate key={key}
            details={this.props.details[key]}
            />
          ))
        }
        </ul>
      </div>
      )
    }
  }
  export default Pirates;