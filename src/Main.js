import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TextEditor from './TextEditor';
import clipboard from '../public/clipboard-text.png';
import help_circle from '../public/help-circle.png';

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
            clipboard: {
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
            }
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
                            <button type='button' style={{
                                                    ...styles.clipboard,
                                                    border: '0px'}}>
                                <img alt='help_circle' src={help_circle} />
                            </button>
                            <button type='button' style={styles.clipboard}>
                                <img alt='clipboard' src={clipboard} />
                            </button>
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
        error: store.links_data.error
    }
};

export default connect(mapStateToProps)(Main);
