import React, { Component } from 'react';
import CheckList from './CheckList';

class InputTodo extends Component {
    constructor(){
        super();
        this.tasks = [{name:"default",id:"1",done:false}];
        this.state = {cards:this.tasks};
    }

    checkInputKeyPress(evt){
        if(evt.key === 'Enter'){
            let ran = Math.floor(Math.random() * 100);
            this.tasks.push({name:evt.target.value, id:ran, done:false});
            this.setState({cards:this.tasks});
            console.log(this.state.cards)
            evt.target.value = '';
        }
    }

    render() {
        return (
            <div className="checklist">
                <input type="text" className="checklist--add-task" placeholder="Type then hit Enter to add a task"
                    onKeyPress={this.checkInputKeyPress.bind(this)} />
                <ul><CheckList tasks={this.state.cards}/></ul>
            </div>
            
        );
    }
}
  
export default InputTodo;