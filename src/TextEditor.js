import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Paragraph from './Paragraph';

class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            paragraphs: [],
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

        const paragraphs_index = formatted_string.split(/<div>/).map((_, index) => {
            return index;
        });
        console.log(formatted_string);
        this.setState({
            value: formatted_string,
            paragraphs: paragraphs_index,
        });
    }

    switchParagraphs = (paragraph1, paragraph2) => {
        let index_1 = this.state.paragraphs.indexOf(paragraph1);
        let index_2 = this.state.paragraphs.indexOf(paragraph2);
        this.setState((prevState) => {
            // swap the two paragraphs
            const new_paragraphs = prevState.paragraphs;
            new_paragraphs[index_1] = paragraph2;
            new_paragraphs[index_2] = paragraph1;
            return {
                paragraphs: new_paragraphs
            }
        });
    }

    render() {

        const styles = {
            main: {
                display: 'flex',
                overflow: 'auto',
                width: 900,
                minHeight: 300,
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
            },
            paragraph: {
                width: 14,
                borderLeft: '1px solid black',
                overflow: 'hidden',
            }
        };

        // TODO: Does not account for lines longer than width of editor. Make it so.
        const num_lines_display = this.state.value.split(/<div>/).map((_, index) => {
            return <p style={styles.lineNum} key={index}>{++index}<br /></p>;
        });

        const paragraphs_display = this.state.paragraphs.map((value, index) => {
            return <Paragraph key={index} switch={this.switchParagraphs} index={value} />;
        });

        // shave off the extra line number
        num_lines_display.pop();
        paragraphs_display.pop();

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
                {<div style={styles.paragraph}>
                    {paragraphs_display}
                </div>}
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(TextEditor);
