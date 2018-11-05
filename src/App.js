import React, { lazy, Suspense, Component } from 'react';
import NavBar from './Component/NavBar';
import Footer from './Component/footerComp';
import AboutComp from './Component/AboutComp';
// import ProjectComponent from './Component/ProjectsComp';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/store';

const ProjectComponent = lazy(() => import('./Component/ProjectsComp'));

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <NavBar />
          <AboutComp />
          <Suspense fallback={<div>Fetching Project details... </div>}>
            <ProjectComponent />
          </Suspense>
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
