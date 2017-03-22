import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { updateValue, updateParagraphs } from './actions';
import Paragraph from './Paragraph';

class TextEditor extends Component {
    handleChange = (evt) => {
        // ensures symmetry by having each line contained in a div
        const cleanup_string = (str) => {
            let pos_first_div = str.indexOf('<div>');
            if(pos_first_div === -1) {
                return '<div>' + str + '</div>';
            }
            else if(pos_first_div > 0) {
                return '<div>' + str.substr(0, pos_first_div) + '</div>' + str.substr(pos_first_div);
            }
            else {
                return str;
            }
        };

        let formatted_string = cleanup_string(evt.target.value);
        const paragraphs = formatted_string.split(/<div>/).map((value, index) => {
            return value.substr(0, value.length - 6);
        });
        paragraphs.shift();
        this.props.updateParagraphs(paragraphs);
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
        const paragraphs = {};
        paragraphs.line_num = this.props.paragraphs.map((_, index) => {
            return <p style={styles.lineNum} key={index}>{index}<br /></p>;
        });

        paragraphs.handles = this.props.paragraphs.map((_, index) => {
            return <Paragraph key={index} index={index} />;
        });

        return (
            <div style={styles.main}>
                <div style={styles.linesDisplay}>
                    {paragraphs.line_num}
                </div>
                <ContentEditable
                     html={this.props.content}
                     onChange={this.handleChange}
                     ref={(input) => this.textArea = input }
                     style={styles.textarea} />
                {<div style={styles.paragraph}>
                    {paragraphs.handles}
                </div>}
            </div>
        );
    }
}

const mapStateToProps = (store) => {
  return {
    paragraphs: store.paragraphs,
    content: store.paragraphs.reduce((str, paragraph) => {
            return str + `<div>${paragraph}</div>`;
        }, '')
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateValue: (value) => dispatch(updateValue(value)),
        updateParagraphs: (paragraphs) => dispatch(updateParagraphs(paragraphs))
    }
};

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(TextEditor));
