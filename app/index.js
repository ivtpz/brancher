import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import { resetTree } from './actions/verticalTreeActions';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

history.listen(location => {
  if (location.pathname === '/') {
    store.dispatch(resetTree());
  }
});

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
