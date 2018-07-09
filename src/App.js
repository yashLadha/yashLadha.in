import React, { Component } from 'react';
import NavBar from './Component/NavBar';
import AboutComp from './Component/AboutComp';
import ProjectComponent from './Component/ProjectsComp';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <AboutComp />
        <ProjectComponent />
      </div>
    );
  }
}

export default App;
