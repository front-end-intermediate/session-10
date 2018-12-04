import React from 'react';
import { Link } from 'react-router-dom';
import base from '../base';

class PirateDetail extends React.Component {

  constructor() {
    super();
    this.state = {
      details: [],
      // pirateId: this.props.match.params.number
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

    const pirate = this.state.details.filter(
      key => key._id === this.props.match.params.number
    )
    const pirateDeet = { ...pirate[0] };

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

} 

  export default PirateDetail