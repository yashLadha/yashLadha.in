import { createStore, applyMiddleware, compose } from 'redux';
import { Reducer } from './reducer';
import thunk from 'redux-thunk';

export const ConfigureStore = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(Reducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
};
