import React, { Component } from 'react';
import NavBar from './Component/NavBar';
import AboutComp from './Component/AboutComp';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <AboutComp />
      </div>
    );
  }
}

export default App;
