import * as React from 'react';
import * as ReactDOM from 'react-dom';
import store from './state/store';
import './app.scss';
import Application from './components/Application';

ReactDOM.render(<Application store={store} />, document.getElementById('root'));
