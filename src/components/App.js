import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Pirates from './Pirates';
import PirateDetail from './PirateDetail';
import Header from './Header'
import Home from './Home';
import Nav from './Nav';

import base from '../base';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      pirates: {}
    }
  }

  componentDidMount(){
    this.ref = base.syncState(`daniel-deverell-pirates/pirates`, {
      context: this,
      state: 'pirates'
    })
  }

  componentWillUmount(){
    base.removeBinding(this.ref)
  }
  
  render() {
      
      return(
        <Route>
        <React.Fragment>
        <Header headline='Pirates!' />
        <Nav />
        <Switch>
        <Route exact path='/' component={Home} />
        
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
    }
    
    export default App;