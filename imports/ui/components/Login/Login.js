import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const Login = (props) =>  (
  <div>
    <h1 className="title">
      Login
    </h1>
    <div className="box">
      <form onSubmit={(event) => props.onLoginFormSubmit(event)}>
        <label className="label">Email</label>
        <p className="control">
          <input name="email" className="input" type="email" placeholder="jsmith@example.org" required />
        </p>
        <label className="label">Password</label>
        <p className="control">
          <input name="password" className="input" type="password" placeholder="●●●●●●●" required />
        </p>
        <hr />
        <p className="control">
          <button type="submit" className="button is-primary">Login</button>
        </p>
      </form>
      <hr />
      <label className="label">Continue with LinkedIn</label>
      <p className="control">
        <button className="button is-medium" onClick={props.onOAuthClick}>
                                <span className="icon">
                                  <i className="fa fa-linkedin" />
                                </span>
          <span>Linkedin</span>
        </button>
      </p>
      <div className="content is-danger">
        <p className="is-danger" style={{color: 'red'}}>
          {props.errorMessage}
        </p>
      </div>

    </div>
    <p className="has-text-centered">
      <NavLink to="/signup">Register an Account</NavLink>
      |
      <a href="#">Forgot password</a>
    </p>
  </div>

);

export default Login;
