import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const SignUp = props => (
  <div className="container">
    <div className="columns is-vcentered">
      <div className="column is-4 is-offset-4">
        <h1 className="title">
                  Register an Account
              </h1>
        <div className="box">
          <form onSubmit={event => props.onSignUpFormSubmit(event)} >

            <label className="label">FirstName</label>
            <p className="control">
              <input name="firstName" className="input" type="text" placeholder="John" required />
            </p>
            <label className="label">LastName</label>
            <p className="control">
              <input name="lastName" className="input" type="text" placeholder="Smith" required />
            </p>
            <label className="label">Email</label>
            <p className="control">
              <input name="email" className="input" type="email" placeholder="jsmith@example.org" required />
            </p>
            <hr />
            <label className="label">Password</label>
            <p className="control">
              <input name="password" className="input" type="password" placeholder="●●●●●●●" required />
            </p>
            <label className="label">Confirm Password</label>
            <p className="control">
              <input name="confirm" className="input" type="password" placeholder="●●●●●●●" required />
            </p>
            <hr />
            <p className="control">
              <button type="submit" className="button is-primary">Register</button>
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
            <p className="is-danger" style={{ color: 'red' }}>
              {props.errorMessage}
            </p>
          </div>
        </div>
        <p className="has-text-centered">
          <NavLink to="/login">Go to Login</NavLink>

        </p>
      </div>
    </div>
  </div>
);

export default SignUp;
