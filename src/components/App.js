import React, { Component } from 'react';
import Pirate from './Pirate'
import Header from './Header'
import PirateForm from './PirateForm'
import piratesFile from '../data/sample-pirates-object';

import base from '../base'

import axios from 'axios';

class App extends Component {
  
  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.removePirate = this.removePirate.bind(this);
    this.updatePirate = this.updatePirate.bind(this);
    this.state = {
      pirates: {}
    }
  }
  
  componentDidMount(){
    this.ref = base.syncState(`first-last-pirates/pirates`, {
      context: this,
      state: 'pirates'
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }
  
  render() {
        
    return (
      <div className="App">
      <Header headline="Pirates!" />
      
      {
        Object.keys(this.state.pirates)
        .map(key =>
          <Pirate key={key}
          index={key}
          details={this.state.pirates[key]}
          removePirate={this.removePirate} />)
        }
        
        <PirateForm
          updatePirate={this.updatePirate}
          pirates={this.state.pirates}
          loadSamples={this.loadSamples}
          addPirate={this.addPirate} />
        </div>
        );
      }
      
      loadSamples() {
        this.setState({
          pirates: piratesFile
        })
      }
      
      removePirate(key){
        const newpirates = { ...this.state.pirates }
        newpirates[key] = null;
        this.setState({pirates: newpirates})
      }
      
      addPirate(pirate) {
        const pirates = { ...this.state.pirates }
        const timestamp = Date.now()
        pirates[`pirate-${timestamp}`] = pirate
        this.setState({ pirates })
      }
  
      updatePirate(key, updatedPirate){
        const pirates = {...this.state.pirates};
        pirates[key] = updatedPirate;
        this.setState({ pirates })
      }
      
    }
    
    export default App;