import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import topReducer from './reducers';
import Main from './Main';

let store = createStore(topReducer);

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
  document.getElementById('root')
);

