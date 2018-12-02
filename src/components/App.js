import React, { Component } from 'react';
import {getPirates, deletePirate, newPirate} from '../utils/api';
import Nav from './Nav';
import Header from './Header';
import PirateForm from './PirateForm'
import { Switch, Route } from 'react-router-dom';
import Pirates from './Pirates';
import PirateDetail from './PirateDetail';

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
    getPirates()
    .then(pirates => this.setState({
      pirates: pirates,
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
      <Nav />
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
          // console.log(key)
          const pirates = { ...this.state.pirates }
          let pirateDel = this.state.pirates[key]._id

          deletePirate(pirateDel)
          .then(delete pirates[key])
          .then(this.setState({pirates: pirates}))
          return
        }
        
        addPirate(pirate) {
          const pirates = { ...this.state.pirates }
          newPirate()
          .then ( pirates[pirate] = pirate )
          .then(this.setState({ pirates: pirates }))
        }
        
      }
      
      export default App;
      