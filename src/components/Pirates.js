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
            index={key}
            details={this.props.details[key]}
            removePirate = {this.props.removePirate}
            />
          ))
        }
        </ul>
      </div>
      )
    }
  }
  export default Pirates;