import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Home</h1>
      <Link to='/pirates'>See em All</Link>
    </div>
    )
  }
  
export default Home;