import React, { Component } from 'react';
import { render } from 'react-dom';
 
// first we import some components
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
 
import About from './About';
import Home from './Home';
import Repos from './Repos';
import ServerError from './ServerError';
 
class App extends Component {
    render() {
        return (
            <div>
                <header>App</header>
                    <menu>
                        <ul>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/repos">Repos</Link></li>
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
            <Route path="about" component={About}/>
            <Route path="repos" component={Repos}/>
            <Route path="error" component={ServerError} />
        </Route>
    </Router>
), document.getElementById('root'));