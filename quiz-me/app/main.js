import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
 
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
 
class App extends Component {
    render() {
        return (
            <div>
                <header>Quiz Me</header>
                    <menu>
                        <ul>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Singup</Link></li>
                        </ul>
                    </menu>
                {this.props.children}
            </div>
        );
        }
}
 
render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="login" component={Login}/>
            <Route path="signup" component={Signup}/>
        </Route>
    </Router>
), document.getElementById('root'));