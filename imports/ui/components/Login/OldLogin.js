import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';


const LogIn = props => (
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
          <RaisedButton onClick={props.onLoginClick} label="Log In" secondary />
        </form>
        <span style={{ color: 'red' }}>{props.errorMessage}</span>
      </div>
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <br />
        <br />
        <RaisedButton label="Continue with LinkedIn" primary onClick={props.onOAuthClick} />
      </div>
    </div>
  </div>

);

export default LogIn;
