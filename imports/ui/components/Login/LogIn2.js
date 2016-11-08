import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';


const LogIn = (props) => (
    <div>
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <form>
                    <TextField
                        hintText="Login"
                        floatingLabelText="Login"
                        type="email"
                    />
                    <br />
                    <br />
                    <TextField
                        floatingLabelText="Password"
                        hintText="Password"
                        type="password"
                    />
                    <br />
                    <br />
                    <RaisedButton label="Log In" secondary={true}/>
                </form>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <RaisedButton label="Log In with LinkedIn" primary={true} onClick={props.onOAuthClick}/>
            </div>
        </div>
    </div>

);

export default LogIn;