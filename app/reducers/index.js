import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { verticalTreeData } from './verticalTreeReducers';
import userCode from './userCode';
import async from './asyncReducers';

const rootReducer = combineReducers({
  routing,
  verticalTreeData,
  userCode,
  async
});

export default rootReducer;
