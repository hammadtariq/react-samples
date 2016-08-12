import React, { Component } from 'react';
import DashBoard from './DashBoard';
import 'whatwg-fetch';
 
// If you're running the server locally, the URL will be, by default, localhost:3000
// Also, the local server doesn't need an authorization header.
const API_URL = 'http://localhost:3000';
const API_HEADERS = {
    'Content-Type': 'application/json'
    //Authorization: 'any-string-you-like'// The Authorization is not needed for local server
};
 
class DashboardContainer extends Component {
    constructor(){
        super(...arguments);
        this.state = {
            cards: {active:[],failed:[],complete:[],delayed:[]}
        };
    }
 
    componentDidMount(){
        fetch(API_URL+'/logs', {headers: API_HEADERS})
            .then((response) => response.json())
            .then((responseData) => {
                console.log("res data from api: ",responseData)
                this.setState({cards: responseData});
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error);
            });
    }
    
    render() {
        return <DashBoard cards={this.state.cards} />
    }
}
 
export default DashboardContainer;