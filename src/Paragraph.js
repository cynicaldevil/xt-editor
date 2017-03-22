import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import { switchParagraphs } from './actions';
import { ItemTypes } from './Constants';

// register event listeners for the dragging part
const paragraphSource = {
  beginDrag(props) {
    return { index: props.index };
  }
};

const paragraphTarget = {
    drop(props, monitor, paragraph) {
        paragraph.decoratedComponentInstance.props.switchParagraphs(
            monitor.getItem().index, props.index);
    },
    hover(props, monitor, component) {
    }
}

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
  }
}

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class Paragraph extends Component {
    render() {
        const { connectDragSource, connectDropTarget, isOver , length} = this.props;
        return connectDropTarget(connectDragSource(<div style={{
                    width: 10,
                    height: 14 * length + (4 * (length-1)),
                    padding: 1,
                    border: '1px solid green',
                    opacity: isOver ? 0.5 : 1,
                    backgroundColor: 'red'}} />));
    }
}

Paragraph.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        switchParagraphs: (para1, para2) => dispatch(switchParagraphs(para1, para2))
    };
};

export default connect(null, mapDispatchToProps)(flow(
    DragSource(ItemTypes.PARAGRAPH, paragraphSource, collectSource),
    DropTarget(ItemTypes.PARAGRAPH, paragraphTarget, collectTarget))(Paragraph));
