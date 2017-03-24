import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TextEditor from './TextEditor';

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
                    {this.props.error ? <p>Warning! Nested or unbalanced link tags!</p> : null}
                    <Button type='button'
                        onClick={this.handleClick}>Done</Button>
                    <div style={styles.links}>{links}</div>
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
