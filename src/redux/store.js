import { createStore, applyMiddleware } from 'redux';
import { Reducer } from './reducer';
import thunk from 'redux-thunk';

export const ConfigureStore = () => {
  const store = createStore(
    Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  );
  return store;
};
