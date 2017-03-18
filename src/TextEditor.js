import React, { Component } from 'react';

class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleChange = () => {
        // ensure symmetry
        let input_string = '<div>' + this.textArea.innerHTML;
        console.log(input_string);
        this.setState({
            value: input_string,
        });
    }

    render() {

        const styles = {
            main: {
                display: 'flex',
            },
            linesDisplay: {
                width: 30,
                border: '1px solid black',
                display: 'flex',
                flexDirection: 'column',
            },
            lineNum: {
                height: 18,
                margin: 0,
            },
            textarea: {
                width: 900,
                height: 300,
                border: '1px solid grey'
            }
        };

        // TODO: Does not account for lines longer than width of editor. Make it so.
        const num_lines_display = this.state.value.split(/<div>/).map((_, index) => {
            return <p style={styles.lineNum} key={index}>{++index}<br /></p>;
        });

        // shave off the extra line number
        num_lines_display.pop();

        return (
            <div style={styles.main}>
                <div style={styles.linesDisplay}>
                    {num_lines_display}
                </div>
                <div contentEditable='true'
                     value={this.state.value}
                     onInput={this.handleChange}
                     ref={(input) => this.textArea = input }
                     style={styles.textarea} />
            </div>
        );
    }
}

export default TextEditor;
