import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import HistoryContainer from './components/HistoryContainer';
import { VisualA, VisualB } from './components/visuals';
import store from './state/store';
import debug from 'debug';
import './app.scss';
debug.enable('*,-sockjs*');

ReactDOM.render(
  <Provider store={store}>
    <div className="app-container">
      <div className="dashboard">
        <div className="visual-pane">
          <VisualA />
          <VisualB />
        </div>
        <div className="history-pane">
          <HistoryContainer />
        </div>
      </div>
    </div>
  </Provider>
  , document.getElementById('root')
);
