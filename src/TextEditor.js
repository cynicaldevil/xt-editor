import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { updateValue, updateParagraphs, updateLinks } from './actions';
import { cleanup_string, find_links } from './utils';
import Paragraph from './Paragraph';

class TextEditor extends Component {
    handleChange = (evt) => {
        let formatted_string = cleanup_string(evt.target.value);
        console.log(formatted_string)
        this.props.updateLinks(find_links(formatted_string));
        const paragraphs = formatted_string.split(/<div>/).map((value, index) => {
            return value.substr(0, value.length - 6);
        });
        paragraphs.shift();
        this.props.updateParagraphs(paragraphs);
    }

    componentDidMount = () => {
       this.textArea.htmlEl.focus();
    }

    render() {
        const styles = {
            main: {
                align: 'center',
                display: 'flex',
                overflow: 'auto',
                width: 900,
                minHeight: 300,
                borderRight: '1px solid #575756',
                paddingRight: 5,
                fontSize: 15,
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
                {/*<div style={styles.linesDisplay}>
                    {paragraphs.line_num}
                </div>*/}
                <ContentEditable autoFocus
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
