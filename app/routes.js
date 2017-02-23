import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Menu from './components/Menu';
import OptionsMenu from './components/OptionsMenu';
import VerticalTree from './containers/VerticalTree';
import ExampleTree from './containers/ExampleTree';
import LinkedList from './containers/LinkedList';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Menu} />
    <Route
      path="codeOptions"
      component={() => (
        <OptionsMenu
          links={[
            {
              path: '/codeTree',
              text: 'Tree'
            }, {
              path: '/codeLinkedList',
              text: 'Linked List'
            }
          ]}
        />
      )}
    />
    <Route
      path="treeExamples"
      component={() => (
        <OptionsMenu
          links={[
            {
              path: '/AVLTree',
              text: 'AVLTree'
            }
          ]}
        />
      )}
    />
    <Route path="codeTree" component={VerticalTree} />
    <Route path="codeLinkedList" component={LinkedList} />
    <Route path="AVLTree" component={() => (<ExampleTree dataStructure='AVLCreator' />)} />
  </Route>
);
