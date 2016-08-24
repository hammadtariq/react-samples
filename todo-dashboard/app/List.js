import React, { Component, PropTypes } from 'react';
import Card from './Card';
import { DropTarget } from 'react-dnd';
import constants from './constants';

const listTargetSpec = {
hover(props, monitor) {
const draggedId = monitor.getItem().id;
props.cardCallbacks.updateStatus(draggedId, props.id)
}
};
 
function collect(connect, monitor) {
return {
connectDropTarget: connect.dropTarget()
};
}

class List extends Component {
    render() {
        const { connectDropTarget } = this.props;

        var cards = this.props.cards.map((card) => {
        return <Card id={card.id} taskCallbacks={this.props.taskCallbacks} key={card.id}
                title={card.title}
                description={card.description}
                tasks={card.tasks} color={card.color}
                cardCallbacks={this.props.cardCallbacks} />
    });
    
    return connectDropTarget(
        <div className="list">
            <h1>{this.props.title}</h1>
            {cards}
        </div>
    );
    }
}
 
List.propTypes = {
title: PropTypes.string.isRequired,
cards: PropTypes.arrayOf(PropTypes.object),
taskCallbacks: PropTypes.object,
cardCallbacks: PropTypes.object,
connectDropTarget: PropTypes.func.isRequired
}

export default DropTarget(constants.CARD, listTargetSpec, collect)(List);