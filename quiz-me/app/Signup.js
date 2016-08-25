import React, { Component } from 'react';
 
class Signup extends Component {

    constructor(){
        super();
        this.state = {

        }
    }

    handleChange(event){
        event.preventDefault();
        console.log("Submitted values are: ",event.target.username.value,event.target.pass.value);
        this.props.history.push('/login')
    }

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <form onSubmit={this.handleChange.bind(this)}>
                    <div className="form-group">
                    User Name: <input name="username" className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                    Email: <input name="email" className="form-control" type="email" />
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
 
export default Signup;