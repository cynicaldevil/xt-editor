import React, { Component } from 'react';

class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div>
                <textarea value={this.state.value}
                          onChange={this.handleChange}
                          ref={(input) => this.textArea = input }
                          rows="20" cols="100" />
            </div>
        );
    }
}

export default TextEditor;
