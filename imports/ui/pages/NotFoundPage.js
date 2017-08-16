import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="container">
    <div className="box">
      <div className="content">
        <h1>Page Not Found</h1>
        <Link to="/">Return to home</Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
