import React, { Component } from 'react';
import Pirates from './Pirates';
import PirateDetail from './PirateDetail';

import Header from './Header'
import Home from './Home';
import base from '../base'



// import PirateForm from './PirateForm';
import Nav from './Nav';

import { Route, Switch } from 'react-router-dom'
import axios from 'axios';

class App extends Component {
  
  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this);
    this.removePirate = this.removePirate.bind(this);
    this.state = {
      pirates: {},
      isLoading: false,
      error: null
    }
  }


  componentWillMount(){
    this.ref = base.syncState(`daniel-deverell-pirates/pirates`, {
      context: this,
      state: 'pirates'
    })
  }

  componentWillUmount(){
    base.removeBinding(this.ref)
  }

  // componentDidMount(){
  //   this.setState({ isLoading: true });
  //   axios.get('http://localhost:3005/api/pirates')
  //   // this.ref = base.syncState(`daniel-deverell-pirates/pirates`, {
  //   //   context: this,
  //   //   state: 'pirates'
  //   // })
  //   // this.setState({ isLoading: false })
  //   .then(response => this.setState({
  //     pirates: response.data,
  //     isLoading: false
  //   }))
  //   .catch(error => this.setState({
  //     error,
  //     isLoading: false
  //   }));
  // }
  
  render() {
    
    const { isLoading, error } = this.state;
    
    if (error) {
      return <p>{error.message}</p>;
    }
    
    if (isLoading) {
      return (
        <React.Fragment>
        <Header headline="Loading!" />
        <p>Loading ...</p>
        </React.Fragment>
        ) 
      }
      
      return(
        <Route>
        <React.Fragment>
        <Header headline='Pirates!' />
        <Nav />
        <Switch>
        <Route exact path='/' component={Home} />
        
        {/* <Route exact path='/pirates' component={Pirates} /> */}
        
        <Route exact path='/pirates' render={(props) => (
          <Pirates {...props} details={this.state.pirates}  />
          )
        } />
        
        <Route path='/pirates/:number' render={(props) => (
          <PirateDetail {...props} details={this.state.pirates} />
          )
        } />
        
        </Switch>
        </React.Fragment>
        </Route>
        )
        
        
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