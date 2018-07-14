import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import WebFontLoader from 'webfontloader';

import store, { history } from './store';

import 'font-awesome/css/font-awesome.min.css';
import './components/style/styles.css';

WebFontLoader.load({
  google: {
  families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
