import React, { Component } from 'react';

class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleChange = () => {
        // ensures symmetry by having each line contained in a div
        const cleanup_string = (str) => {
            let pos_first_div = str.indexOf('<div>');
            if(pos_first_div === -1) {
                return '<div>' + str + '</div>';
            }
            else {
                return '<div>' + str.substr(0, pos_first_div) + '</div>' + str.substr(pos_first_div);
            }
        };

        let formatted_string = cleanup_string(this.textArea.innerHTML);
        console.log(formatted_string);
        this.setState({
            value: formatted_string,
        });
    }

    render() {

        const styles = {
            main: {
                display: 'flex',
                overflow: 'auto',
                width: 900,
                height: 300,
                border: '1px solid grey'
            },
            linesDisplay: {
                width: 30,
                display: 'flex',
                flexDirection: 'column',
            },
            lineNum: {
                height: 18,
                margin: 0,
            },
            textarea: {
                width: 900,
                minHeight: 300,
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
