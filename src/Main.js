import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import placements from 'rc-tooltip/lib/placements';
import TextEditor from './TextEditor';
import clipboard from '../public/clipboard-text.png';
import info from '../public/information.png';

const ButtonStyles = {
    backgroundColor: '#222',
    borderRadius: '50%',
    border: '1px solid #f8f8f2',
    cursor: 'pointer',
    opacity: '.5',
    textAlign: 'center',
    transition: 'all .333s',
    height: 40,
    width: 40,
    display: 'flex',
    justifyContent: 'space-around',
    marginLeft: 7,
};

const InfoButton = () => {
    const overlayStyles = {
        fontSize: 12,
        fontFamily: 'Courier New'
    };

    const overlay = (
        <div style={overlayStyles}>
            <ul>
                <li>Shift + Enter creates new lines,
                    <br />Enter creates paragraphs</li>
                <li>Grab the handles along the right<br />edge
                    of the editor to move<br />paragraphs
                    around</li>
            </ul>
        </div>
    );

    return  (
        <Tooltip
            placement='bottom'
            mouseEnterDelay={0}
            mouseLeaveDelay={0.1}
            trigger='hover'
            destroyTooltipOnHide={true}
            align={{offset: placements['top'].offset,}}
            overlay={overlay}
        >
            <button type='button'
                    style={{
                        ...ButtonStyles,
                        cursor: 'default',
                        border: '0px'}}>
                <img alt='info' src={info} />
            </button>
        </Tooltip>
    );
};

class ClipboardButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: 'Copy to clipboard',
        };
    }

    format_string = (str) => {
        return str
              .replace(/<br>/gi, '\n')
              .replace(/&nbsp;/gi, ' ')
              .replace(/&gt;/gi, '>')
              .replace(/&lt;/gi, '<');
    };

    // copies text in editor to clipboard
    handleClick = () => {
        let textArea = document.createElement('textarea');
        textArea.value = this.format_string(this.props.content);
        document.body.appendChild(textArea);
        textArea.select();
        let result;
        try {
          let successful = document.execCommand('copy');
          result = successful ? 'Copied!' : 'Oops, unable to Copy';
        } catch (err) {
          result = 'Oops, unable to copy';
        }

        document.body.removeChild(textArea);
        this.setState({
            copied: result
        });
    };

    handleMouseLeave = () => {
        this.setState({
            copied: 'Copy to clipboard'
        });
    }

    render() {
        const overlay = (
            <p style={{
                fontSize: 12,
                fontFamily: 'Courier New',
                height: 15
            }}>
                {this.state.copied}
            </p>
        );

        return (
            <Tooltip
                placement='bottom'
                mouseEnterDelay={0}
                mouseLeaveDelay={0}
                trigger='hover'
                align={{offset: placements['top'].offset,}}
                overlay={overlay}
            >
                <button type='button'
                        style={ButtonStyles}
                        onClick={this.handleClick}
                        onMouseLeave={this.handleMouseLeave}>
                    <img alt='clipboard' src={clipboard} />
                </button>
            </Tooltip>
        );
    }
};

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localLinks: []
        };
    }

    handleClick = () => {
        this.setState({
            localLinks: this.props.links
        });
    }

    render() {
        const styles = {
            main: {
                color: 'white',
                fontFamily: 'Courier New',
                display: 'flex',
                justifyContent: 'space-around',
            },
            sub: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
            },
            heading: {
                alignSelf: 'center',
                fontSize: 40,
            },
            links: {
                display: 'flex',
                flexDirection: 'column',
                marginRight: 1
            },
            controls: {
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
            },
            warning: {
                visibility: this.props.error ? 'visible' : 'hidden',
                fontSize: 12,
                padding: 5,
                height: 15,
                color: '#FF1B1B',
                backgroundColor: 'rgba(255, 127, 127, 0.2)',
                border: '1px solid #FF1B1B'
            },
        };

        const links = this.state.localLinks.map((link, index) => {
            const colour = index % 2 === 0 ? '#FE3E2E' : '#9DEDFF';
            return <a href='#' key={index} style={{color: colour}}>{link}</a>;
        });

        const Button = styled.button`
            color: white;
            font-family: Courier New;
            fontsize: 24;
            padding: 18px;
            padding-top: 10px;
            padding-bottom: 10px;
            margin: 15px;
            margin-right: 1px;
            cursor: pointer;
            backgroundColor: #222;
            border: 1px solid #575756;
        `;

        return (
            <div style={styles.main}>
                <div style={styles.sub}>
                    <h1 style={styles.heading}>xt-editor</h1>
                    <TextEditor />
                    <div style={styles.controls}>
                        <p style={styles.warning}>
                            Warning! Nested or unbalanced link tags!
                        </p>
                        <div>
                            <div style={{display: 'flex',
                                         alignItems: 'center',
                                         paddingTop: 5}}>
                                <InfoButton />
                                <ClipboardButton content={this.props.content}/>
                                <Button type='button'
                                    onClick={this.handleClick}>Done</Button>
                            </div>
                            <div style={styles.links}>{links}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        links: store.links_data.links,
        error: store.links_data.error,
        content: store.paragraphs.reduce((str, paragraph) => {
            return str + `${paragraph}\n`;
        }, '')
    }
};

export default connect(mapStateToProps)(Main);
