import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = props => (
  <div className="container">
    <div className="content">
      <h1>Page Not Found</h1>
      <Link to="/">Return to home</Link>
    </div>
  </div>
);

export default NotFoundPage;
