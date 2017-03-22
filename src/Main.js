import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import topReducer from './reducers';
import TextEditor from './TextEditor';

let store = createStore(topReducer);

class Main extends Component {
    render() {
        return (
            <Provider store={store}>
                <TextEditor />
            </Provider>
        );
    }
}

export default Main;
