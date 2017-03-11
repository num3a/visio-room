import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const SignUp = (props) => (
    <div>
        <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <form>

                    <TextField
                        hintText="FirstName"
                        floatingLabelText="FirstName"
                        type="text"
                        onChange={props.onFirstNameChange}
                    />

                    <TextField
                        hintText="LastName"
                        floatingLabelText="LastName"
                        type="text"
                        onChange={props.onLastNameChange}
                    />

                    <TextField
                        hintText="Email"
                        floatingLabelText="Email"
                        type="email"
                        onChange={props.onEmailChange}
                    />

                    <br />
                    <TextField
                        floatingLabelText="Password"
                        hintText="Password"
                        type="password"
                        onChange={props.onPasswordChange}
                    />
                    <br />
                    <TextField
                        floatingLabelText="Confirm Password"
                        hintText="Confirm Password"
                        type="password"
                        onChange={props.onConfirmChange}
                    />
                    <br />
                    <RaisedButton onClick={props.onSignUpClick} label="Sign Up" secondary={true}/>
                </form>
                <span style={{color: 'red'}}>{props.errorMessage}</span>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <br />
                <br />
                <RaisedButton label="Continue with LinkedIn" primary={true} onClick={props.onOAuthClick}/>
            </div>
        </div>
    </div>
);

export default SignUp;