import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { verticalTreeData } from './verticalTreeReducers';
import { linkedListData } from './linkedListReducers';
import userCode from './userCode';
import async from './asyncReducers';
import tutorial from './tutorialReducers';

const rootReducer = combineReducers({
  routing,
  verticalTreeData,
  linkedListData,
  userCode,
  async,
  tutorial
});

export default rootReducer;
