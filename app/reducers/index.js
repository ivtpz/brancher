import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { verticalTreeData } from './verticalTreeReducers';
import userCode from './userCode';
import async from './asyncReducers';
import tutorial from './tutorialReducers';

const rootReducer = combineReducers({
  routing,
  verticalTreeData,
  userCode,
  async,
  tutorial
});

export default rootReducer;
