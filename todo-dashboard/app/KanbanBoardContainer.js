import React, { Component } from 'react';
import update from 'react-addons-update';

import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';
 
// If you're running the server locally, the URL will be, by default, localhost:3000
// Also, the local server doesn't need an authorization header.
const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'any-string-you-like'// The Authorization is not needed for local server
};
 
class KanbanBoardContainer extends Component {
    constructor(){
        super(...arguments);
        this.state = {
            cards: []
        };
    }
 
    componentDidMount(){
        fetch(API_URL+'/cards', {headers: API_HEADERS})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({cards: responseData});
                window.state = this.state;
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error);
            }); 
    }

    addTask(cardId,taskName){
        // Keep a reference to the original state prior to the mutations
        // in case you need to revert the optimistic changes in the UI
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        let newTask = {id:Date.now(), name:taskName, done:false};
        let nextState = update(this.state.cards,{
            [cardIndex]:{
                tasks:{$push: [newTask]}
            }
        });

        this.setState({cards:nextState});   
        // Call the API to add the task on the server
        // Call the API to add the task on the server
        fetch(`${API_URL}/cards/${cardId}/tasks`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newTask)
        })
        .then((response) => {
            if(response.ok){
                return response.json()
            } else {
                // Throw an error if server response wasn't 'ok'
                // so you can revert back the optimistic changes
                // made to the UI.
                throw new Error("Server response wasn't OK")
            }
        })
        .then((responseData) => {
            // When the server returns the definitive ID
            // used for the new Task on the server, update it on React
            newTask.id=responseData.id
            this.setState({cards:nextState});
        })
        .catch((error) => {
            this.setState(prevState);
        });
    }


    deleteTask(cardId, taskId, taskIndex){
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        // Keep a reference to the original state prior to the mutations
        // in case you need to revert the optimistic changes in the UI
        let prevState = this.state;
        let nextState = update(this.state.cards,{[cardIndex]:{
            tasks:{$splice:[[taskIndex,1]]}
            }
        });

        this.setState({cards:nextState});   
        
        // Call the API to remove the task on the server
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'delete',
            headers: API_HEADERS
        })
        .then((response) => {
            if(!response.ok){
            // Throw an error if server response wasn't 'ok'
            // so you can revert back the optimistic changes
            // made to the UI.
            throw new Error("Server response wasn't OK")
            }
        })
        .catch((error) => {
            console.error("Fetch error:",error)
            this.setState(prevState);
        });
    }
    
    toggleTask(cardId, taskId, taskIndex){
        console.log("toggle clicked")
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        let prevState = this.state;
        let newDoneValue;
        let nextState = update(this.state.cards,{[cardIndex]:{
            tasks:{
                [taskIndex]:{
                    done:{$apply:(done)=>{
                        newDoneValue = done;
                        return newDoneValue;
                    }} 
             }}
            }
        });

        this.setState({cards:nextState});
        
        // Call the API to toggle the task on the server
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({done:newDoneValue})
        })
        .then((response) => {
            if(!response.ok){
            // Throw an error if server response wasn't 'ok'
            // so you can revert back the optimistic changes
            // made to the UI.
            throw new Error("Server response wasn't OK")
        }
        })
        .catch((error) => {
            console.error("Fetch error:",error)
            this.setState(prevState);
        });
    }

    render() {
        return <KanbanBoard cards={this.state.cards}
                taskCallbacks = {{
                    add:this.addTask.bind(this),
                    delete:this.deleteTask.bind(this),
                    toggle:this.toggleTask.bind(this)
                    }} />
    }
}
 
export default KanbanBoardContainer;