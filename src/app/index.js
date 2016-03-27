import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

render(
  <Provider>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>, document.getElementById('root')
);