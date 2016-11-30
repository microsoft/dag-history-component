import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import HistoryContainer from './components/HistoryContainer';
import VisualA from './components/visuals/VisualA';
import VisualB from './components/visuals/VisualB';
import store from './state/store';
import './app.scss';

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
