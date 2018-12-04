import React, { Component } from 'react';
import Pirates from './Pirates';
import PirateDetail from './PirateDetail';
import AddPirateForm from './AddPirateForm';
import Header from './Header'
import Home from './Home';
import base from '../base';
import Nav from './Nav';
import { Route, Switch } from 'react-router-dom'

class App extends Component {
  
  constructor() {
    super();
    this.removePirate = this.removePirate.bind(this);
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

  removePirate(key){
    console.log(key)
    const pirates = {...this.state.pirates}
    pirates[key] = null
    this.setState({pirates})
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
          <Pirates {...props} details={this.state.pirates}
          removePirate  = {this.removePirate}  />
          )
        } />

        <Route path='/add' render={ (props) => (
          <AddPirateForm {...props} /> )} />
        
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