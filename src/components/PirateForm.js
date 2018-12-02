import React, { Component } from 'react';
import AddPirateForm from './AddPirateForm';

class PirateForm extends Component {
  render(){
    return (
      <div>
      <h3>Pirate Form Component</h3>
        <AddPirateForm addPirate={this.props.addPirate} />
      </div>
      )
  }
  
}

export default PirateForm;