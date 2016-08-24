import React, { Component } from 'react';
class CheckList extends Component {
    
    render() {
        let tasks = this.props.tasks.map((task) => (
            <li className="checklist__task" key={task.id}>
                <input type="checkbox" defaultChecked={task.done} />
                {task.name}
                <a href="#" className="checklist__task--remove" />
            </li>
        ));
        
        return (
            <div className="checklist">
                {tasks}
            </div>
        );
    }
}
  
export default CheckList;