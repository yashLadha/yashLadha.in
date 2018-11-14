import React, { lazy, Suspense, Component } from 'react';
import NavBar from './Component/NavBar';
import Footer from './Component/footerComp';
import AboutComp from './Component/AboutComp';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/store';
// import Contact from './Component/ContactComp';
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
          </MuiThemeProvider>
          {/* TODO : Add Function on firebase to automatically update the interface of admin application */}
          {/* <Contact /> */}
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
