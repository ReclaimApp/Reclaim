import { combineReducers } from 'redux';
import FacebookReducer from './FacebookReducer/FacebookReducer';
import TwitterReducer from './TwitterReducer/TwitterReducer';

const rootReducer = combineReducers({
  FacebookReducer,
  TwitterReducer,
});

export default rootReducer;
