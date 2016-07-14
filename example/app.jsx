import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import HistoryContainer from './components/HistoryContainer';
import { VisualA, VisualB } from './components/visuals';
import store from './state/store';
import debug from 'debug';
require('./app.sass');
debug.enable('*,-sockjs*');

ReactDOM.render(
  <Provider store={store}>
    <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
      <div style={{ display: 'flex', flex: 3, flexDirection: 'column' }}>
        <VisualA />
        <VisualB />
      </div>
      <div style={{ display: 'flex', flex: 1 }}>
        <HistoryContainer />
      </div>
    </div>
  </Provider>
  , document.getElementById('root')
);
