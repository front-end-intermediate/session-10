import React, { Component } from 'react';
import Home from './Home';
import Pirate from './Pirate'
import Header from './Header';
import Nav from './Nav';
import AddPirateForm from './AddPirateForm';
import {getPirates, deletePirate, newPirate} from '../api';

import { Switch, Route } from 'react-router-dom';

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
  
  render(){

    const { isLoading, error } = this.state;
    
    if (error) {
      return <p>{error.message}</p>;
    }
    
    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return(
      <Route>
        <React.Fragment>
        <Header headline='Pirates!' />
        <Nav />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route 
            path='/add'
            render={ (props) => <AddPirateForm {...props}  addPirate={this.addPirate} />}
          />
          <Route path='/pirates' component={Pirate} />
          <Route render={function(){
            return <h2>Not found</h2>
          }} />
        </Switch>
        </React.Fragment>
      </Route>
    )
  }

  removePirate(key){
    const pirates = { ...this.state.pirates }
    let pirateDel = this.state.pirates[key]._id
    deletePirate(pirateDel)
    .then(delete pirates[key])
    .then(this.setState({pirates: pirates}))
    return
  }
  
  addPirate(pirate) {
    const pirates = { ...this.state.pirates }
    newPirate(pirate)
    .then ( pirates[pirate] = pirate )
    // .then(this.setState({ pirates: pirates }))
    .then(response => console.log(response.data))
  }
}

export default App;
