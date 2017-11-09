import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authentication from './authentication';
import memo from './memo';
import search from './search';

export default combineReducers({
  authentication, memo, search, routing: routerReducer,
});
