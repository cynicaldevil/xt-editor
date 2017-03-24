import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        const style = {
            links: {
                display: 'flex',
                flexDirection: 'column'
            }
        };

        const links = this.state.localLinks.map((link, index) => {
            const colour = index % 2 === 0 ? 'red' : 'blue';
            return <a href='#' key={index} style={{color: colour}}>{link}</a>;
        });

        return (
            <div>
                <TextEditor />
                <button type='button' onClick={this.handleClick}>Done</button>
                <div style={style.links}>{links}</div>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        links: store.links
    }
};

export default connect(mapStateToProps)(Main);
