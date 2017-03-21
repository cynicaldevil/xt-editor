import React, { Component, PropTypes } from 'react';
import { ItemTypes } from './Constants';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

// register event listeners for the dragging part
const paragraphSource = {
  beginDrag(props) {
    return { index: props.index };
  }
};

const paragraphTarget = {
    drop(props, monitor, paragraph) {
        paragraph.decoratedComponentInstance.props.switch(monitor.getItem().index, props.index);
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
        const { connectDragSource, connectDropTarget, isOver } = this.props;
        return connectDropTarget(connectDragSource(<div style={{
                    width: 10,
                    height: 14,
                    padding: 1,
                    border: '1px solid green',
                    opacity: isOver ? 0.5 : 1,
                    backgroundColor: 'red'}}>{this.props.index}</div>));
    }
}

Paragraph.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
};

export default flow(
    DragSource(ItemTypes.PARAGRAPH, paragraphSource, collectSource),
    DropTarget(ItemTypes.PARAGRAPH, paragraphTarget, collectTarget))(Paragraph);
