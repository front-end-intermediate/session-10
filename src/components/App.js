import React, { Component } from 'react';
import Pirate from './Pirate'
// import Header from './Header'
import PirateForm from './PirateForm'

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
      {/* <Header headline="Pirates!" /> */}
      {/* {console.log(this.state.pirates)} */}
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
      
      // addPirate(pirate) {
      //   const locPirates = { ...this.state.pirates }
      //   console.log(locPirates)
      //   axios.post('http://localhost:3005/api/pirates/', pirate)
      //   .then(response => console.log(response.data))
      //   // .then(locPirates[pirate] = pirate)
      //   .then(data => Object.assign(locPirates, data))
      //   .then(console.log(locPirates))
      //   // .then(response => this.setState({
      //   //   pirates: response.data
      //   // }))
      //   // replaces all state with returned values
      // }

      // addPirate(pirate) {
      //   const locPirates = this.state.pirates;
      //   console.log(locPirates)
      //   axios.post('http://localhost:3005/api/pirates/', pirate)
      //   .then(response => console.log(response.data))
      //   // .then(locPirates[pirate] = pirate)
      //   .then(console.log(locPirates))
      //   // .then(response => this.setState({
      //   //   pirates: response.data
      //   // }))
      //   // replaces all state with returned values
      // }

      // addPirates(pirate) {
      //   const locPirates = { ...this.state.pirates }
      //   // console.log(locPirates)
      //   const currVal = {
      //     0: {_id: "5a1cb0639b8e063c479140d6", name: "Gary Glitter", vessel: "Big Vessel", weapon: "Twitter", __v: 0},
      //     1: {_id: "5a1cb2a68c2c0a3c59578c9f", name: "William Kiderererer", vessel: "Tubalard", weapon: "Weapon", __v: 0},
      //     2: {_id: "5a1cb2a68c2c0a3c59578ca0", name: "Samuel Bellamy", vessel: "Whydah", weapon: "Cannon", __v: 0},
      //     3: {_id: "5a1cb2a68c2c0a3c59578ca1", name: "Mary Read", vessel: "Rackham", weapon: "Knife", __v: 0},
      //     4: {_id: "5a1cb2a68c2c0a3c59578ca2", name: "John Rackham", vessel: "The Calico", weapon: "Peg Leg", __v: 0},
      //     5: {_id: "5a1cb8d85b0b743d8634526c", name: "Daniel", vessel: "Yo Ho Ho", weapon: "Pogo Stick", __v: 0},
      //     6: {_id: "5ad8b7a45738e63514439dd8", name: "William Kidd", vessel: "Adventure Galley", weapon: "Sword", __v: 0}
      //   }
      //   const newVal = {_id: "5c02a26179ab649d3247cf74", name: "w", vessel: "w", weapon: "w", __v: 0}

      //   console.log(Object.keys(currVal).sort())

        

        // const pArr = [];
        // pArr.push(this.state.pirates)
        // console.log(pArr)
        // pArr.push(newVal)
        // console.log(pArr)

        // axios.post('http://localhost:3005/api/pirates/', pirate)
        // .then(response => locPirates[pirate] = response.data)
        // .then(console.log(locPirates))
          // .then(response => this.setState({
          //   pirates: response.data
          // }))
        // replaces all state with returned values
      // }
      
      
      // addPirate(pirate) {
      //   // console.log(pirate)
      //   // var timer = Date.now
      //   const locPirates = { ...this.state.pirates }
      //   // console.log(locPirates)
      //   fetch('http://localhost:3005/api/pirates/',
      //   {
      //     method: 'post',
      //     headers: {
      //       "Content-Type": "application/json; charset=utf-8",
      //       // "Content-Type": "application/x-www-form-urlencoded",
      //     },  
      //     body: JSON.stringify(pirate)
      //   })
      //   // .then(this.setState({
      //   //   pirates: {name: 'boo'}
      //   // }))
      //   .then(response => response.json())
      //   .then(data => ({
      //     data: data,
      //     // status: response.status
      //   }))
      //   .then( res => locPirates[pirate] = res.data )
      //   // .then(console.log(locPirates))  // object object
      //   .then(this.setState({
      //     pirates: locPirates
      //   }))
      //   .then (console.log(this.state.pirates))
      //   // replaces all state with returned values
      // }
      
    }
    
    export default App;
    