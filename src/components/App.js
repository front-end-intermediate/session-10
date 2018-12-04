import React, { Component } from 'react';
import Pirate from './Pirate'
import Header from './Header'
import PirateForm from './PirateForm'
import piratesFile from '../data/sample-pirates-object';

import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.removePirate = this.removePirate.bind(this);
    this.state = {
      pirates: {},
      isLoading: true,
      error: null
    }
  }

  componentDidMount(){
    this.setState({ isLoading: true });
    axios.get('http://localhost:3005/api/pirates')
    .then(response => this.setState({
      pirates: response.data,
      isLoading: false
    }))
    .catch(error => this.setState({
      error,
      isLoading: false
    }));
  }

  render() {

    const { isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }
  
    if (isLoading) {
      return (
        <React.Fragment>
        <Header headline="Loading Pirates!" />
        <p>Loading ...</p>
        </React.Fragment>
        ) 
      }
    
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

        <PirateForm loadSamples={this.loadSamples} addPirate={this.addPirate} />
      </div>
    );
  }

  loadSamples() {
    this.setState({
      pirates: piratesFile
    })
  }

  removePirate(key){
    const pirates = { ...this.state.pirates }
    let pirateDel = this.state.pirates[key]._id
    axios.get(`http://localhost:3005/api/pirates/${pirateDel}`)
    .then(delete pirates[key])
    .then(this.setState({pirates}))
  }
  
  addPirate(pirate) {
    const pirates = { ...this.state.pirates }
    axios.post('http://localhost:3005/api/pirates/', pirate)
    .then ( pirates[pirate] = pirate )
    .then(this.setState({ pirates: pirates }))
  }

}

export default App;