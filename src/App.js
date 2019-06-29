import React, { lazy, Suspense, Component } from 'react';
import NavBar from './Component/NavBar';
import Footer from './Component/footerComp';
import AboutComp from './Component/AboutComp';
import GraphComponent from './Component/GraphComp';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/store';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './MaterialTheme';

const ProjectComponent = lazy(() => import('./Component/ProjectsComp'));

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <MuiThemeProvider theme={theme}>
            <NavBar />
            <AboutComp />
            <Suspense fallback={<div>Fetching Project details... </div>}>
              <ProjectComponent />
            </Suspense>
            <Suspense fallback={<div>Fetching Github details... </div>}>
              <GraphComponent />
            </Suspense>
          </MuiThemeProvider>
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
