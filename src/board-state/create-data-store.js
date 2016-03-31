import { createStore, applyMiddleware, combineReducers } from 'redux';
//thunk middleware allows action creators to return functions
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import {createDefaultState} from './create-data';

//store can be initialized with data (optional) from backend (or default)
//structure of data object must match store
export default function(data) {
  var reducer = combineReducers(reducers);
  var finalCreateStore = applyMiddleware(thunk)(createStore);
  if (!data) data = createDefaultState({});
  var store = finalCreateStore(reducer, data);

  return store;
}