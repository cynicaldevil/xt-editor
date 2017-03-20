import React, { Component, PropTypes } from 'react';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';

const paragraphSource = {
  beginDrag(props) {
    return { id: props.id };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Paragraph extends Component {
    render() {
        const { connectDragSource, isDragging } = this.props;
        return connectDragSource(<div style={{width: 10,
                    height: 14,
                    padding: 1,
                    border: '1px solid green',
                    backgroundColor: 'red'}} key={this.props.index} />);
    }
}

Paragraph.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.PARAGRAPH, paragraphSource, collect)(Paragraph);