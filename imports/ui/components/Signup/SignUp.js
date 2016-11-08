import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const SignUp = (props) => (
    <div>
        <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <form>
                    <TextField
                        hintText="Login"
                        floatingLabelText="Login"
                        type="email"
                        onChange={props.onEmailChange}
                    />
                    <br />
                    <br />
                    <TextField
                        floatingLabelText="Password"
                        hintText="Password"
                        type="password"
                        onChange={props.onPasswordChange}
                    />
                    <br />
                    <br />
                    <TextField
                        floatingLabelText="Confirm Password"
                        hintText="Confirm Password"
                        type="password"
                        onChange={props.onConfirmChange}
                    />
                    <br />
                    <br />
                    <RaisedButton onClick={props.onSignUpClick} label="Sign Up" secondary={true}/>
                </form>
                <span style={{color: 'red'}}>{props.errorMessage}</span>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <br />
                <br />
                <RaisedButton label="Sign Up with LinkedIn" primary={true} onClick={props.onOAuthClick}/>
            </div>
        </div>
    </div>
);

export default SignUp;