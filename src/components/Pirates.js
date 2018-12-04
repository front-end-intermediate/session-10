import React, { Component } from 'react';
import Pirate from './Pirate';
import '../assets/css/Pirate.css';
import base from '../base';

class Pirates extends Component {
  
  constructor() {
    super();
    this.state = {
      details: {}
    }
  }
  
  componentWillMount(){
    this.ref = base.syncState(`daniel-deverell-pirates/pirates`, {
      context: this,
      state: 'details'
    })
  }
  
  componentWillUmount(){
    base.removeBinding(this.ref)
  }
  
  render() {
    
    return (
      <div className='pirate'>
      <ul>
      {
        Object.keys(this.state.details).map( key => (
          <Pirate key={key}
          index={key}
          details={this.state.details[key]}
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
    
    
    // render(){
    //   return (
    //     <div className='pirate'>
    //     <ul>
    //       {
    //         Object.keys(this.props.details).map( key => (
    //           <Pirate key={key}
    //           index={key}
    //           details={this.props.details[key]}
    //           removePirate = {this.props.removePirate}
    //           />
    //         ))
    //       }
    //       </ul>
    //     </div>
    //     )
    //   }
    // }