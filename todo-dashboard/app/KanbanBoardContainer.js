import React, { Component } from 'react';
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
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error);
            });
    }
    
    render() {
        return <KanbanBoard cards={this.state.cards} />
    }
}
 
export default KanbanBoardContainer;