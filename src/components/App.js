import React, { Component } from 'react';
// import Pirate from './Pirate';
import Header from './Header';
import PirateForm from './PirateForm'
import { Switch, Route } from 'react-router-dom';
import Pirates from './Pirates';
import PirateDetail from './PirateDetail';

import axios from 'axios';

class App extends Component {
  
  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this);
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
      return <p>Loading ...</p>;
    }
    
    return (
      <div className="App">
      <Header headline="Pirates!" />
      
      <Switch>
        <Route exact path='/' render={(props) => (
          <React.Fragment>
          <Pirates {...props} details={this.state.pirates} removePirate={this.removePirate}  />
          <PirateForm addPirate={this.addPirate} />
          </React.Fragment>
          )} />
        
        <Route path='/pirates/:number' render={(props) => (
          <PirateDetail {...props} details={this.state.pirates} />
          )} />
          
        </Switch>
          
          
          </div>
          );
        }
        
        removePirate(key){
          console.log(key)
          const pirates = { ...this.state.pirates }
          let pirateDel = this.state.pirates[key]._id
          // axios.get(`http://localhost:3005/api/pirates/${pirateDel}`)
          // .then(delete pirates[key])
          // .then(this.setState({pirates}))
        }
        
        addPirate(pirate) {
          const pirates = { ...this.state.pirates }
          axios.post('http://localhost:3005/api/pirates/', pirate)
          .then ( pirates[pirate] = pirate )
          .then(this.setState({ pirates: pirates }))
        }
        
      }
      
      export default App;
      