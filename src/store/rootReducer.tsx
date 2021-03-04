import { combineReducers } from 'redux';
import FacebookReducer from './FacebookReducer/FacebookReducer';
import TwitterReducer from './TwitterReducer/TwitterReducer';
import PathReducer from './PathReducer/PathReducer';

const rootReducer = combineReducers({
  FacebookReducer,
  TwitterReducer,
  PathReducer,
});

export default rootReducer;
