import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { updateValue, updateParagraphs, updateLinks } from './actions';
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

        const find_link = (str) => {
            let i;
            const opening_tag = '&lt;a&gt;';
            const closing_tag = '&lt;/a&gt;'
            let compare = opening_tag;
            let length_compare = 9;
            let start_index;
            let links = [];

            for(i = 0; i < str.length; i++) {
                let substr = str.substring(i, i + length_compare);
                if(substr === compare) {
                    if (compare === opening_tag) {
                        start_index = i + compare.length;
                        compare = closing_tag;
                        length_compare = compare.length;
                    } else {
                        compare = opening_tag;
                        length_compare = compare.length;
                        links.push(str.substring(start_index, i));
                        this.props.updateLinks(links);
                        console.log(str.substring(start_index, i));
                    }
                }
            }
        };

        let formatted_string = cleanup_string(evt.target.value);
        console.log(formatted_string)
        find_link(formatted_string);
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

        paragraphs.handles = this.props.paragraphs.map((content, index) => {
            let length = 1;
            let occurences = (content.match(/<br>/g) || []).length;
            if (occurences > 0 && content !== '<br>') {
                length = occurences;
                if ((content.match(/<br><br>/g) || []).length === 0) {
                    ++length;
                }
            }
            return <Paragraph key={index} index={index} length={length} />;
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
        updateParagraphs: (paragraphs) => dispatch(updateParagraphs(paragraphs)),
        updateLinks: (links) => dispatch(updateLinks(links))
    }
};

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(TextEditor));
