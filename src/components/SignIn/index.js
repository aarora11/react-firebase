import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import {SignUpLink} from '../SignUp';
import { withFirebase } from "../Firebase";
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
    <div>
        <h1>Sign In Form</h1>
        <SignInForm />
        <SignUpLink />
    </div>
);

const INITIAL_STATE = {
    email : '',
    password: '',
    error: null
};

class SignInFormBase extends Component{
    constructor(props){
        super(props);
        this.state = {
            ...INITIAL_STATE
        };
    }

    onSubmit = event => {
        const { email, password } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then((result) => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                console.error(error);
                this.setState({error});
            });

        event.preventDefault();
    };

    onChange = (event) => {
        console.log(event.target.name);
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    render() {
        const {email, password, error} = this.state;
        const isInvalid = email === '' || password === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email..."
                />
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password..."
                />
                <button type="submit" disabled={isInvalid}> Submit</button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase
)(SignInFormBase);

export default SignInPage;
export { SignInForm };