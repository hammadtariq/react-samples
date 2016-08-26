import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
 
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import DashboardContainer from './DashboardContainer';

class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">KBank</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li className="active"><Link to="/home">Home</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Singup</Link></li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                        </ul>
                    </div>
                </nav>
                {this.props.children}
            </div>
        );
    }
}
 
render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route component={DashboardContainer}>
                <IndexRoute component={Home}/>
                <Route path="login" component={Login}/>
                <Route path="signup" component={Signup}/>
                <Route path="dashboard" component={Dashboard}/>
            </Route>
        </Route>
    </Router>
), document.getElementById('root'));