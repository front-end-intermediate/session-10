import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

    const { details } = this.props;

    // if (!this.props.details) {
    //   const { details } = this.state;
    // }
    
    return (
      <div className='pirate'>
      <ul>
          {/* <p>{Object.keys(this.state.details)}</p> */}
        {
          Object.keys(this.state.details).map( key => (
            <li key={key}>
              <Link to={`pirates/${key._id}`}>{key.name}</Link>
            </li>
          ))
        }
        </ul>
      </div>
      )
    }
  }
  export default Pirates;