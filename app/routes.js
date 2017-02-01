// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Menu from './components/Menu';
import VerticalTree from './containers/VerticalTree';
import ExampleTree from './containers/ExampleTree';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Menu} />
    <Route path="usertree" component={VerticalTree} />
    <Route path="treeExamples" component={ExampleTree} />
  </Route>
);
