import React, { Component } from 'react';
 
class Login extends Component {

    constructor(){
        super();
        this.state = {

        }
    }
    handleChange(event){
        event.preventDefault();
        console.log("Submitted values are: ",event.target.username.value,event.target.pass.value);
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleChange.bind(this)}>
                    <div className="form-group">
                    User Name: <input name="username" className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                    Password: <input name="pass" className="form-control" type="password" />
                    </div>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>
        );
    }
}
 
export default Login;