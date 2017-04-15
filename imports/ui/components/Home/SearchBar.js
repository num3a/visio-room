import React, { Component } from 'react';

const SearchBar = (props) => (
  <nav className="level">
    <div className="level-left">
      <div className="level-item">
        <p className="subtitle is-5">
          <strong>{props.count}</strong> rooms
        </p>
      </div>
      <div className="level-item">
        <p className="control has-addons">
          <input className="input" type="text" placeholder="Find a room" />

        </p>
      </div>
      <div className="level-item">
        <button className="button">
          Search
        </button>
      </div>
    </div>
    <div className="level-right">
      <p className="level-item"><strong>All</strong></p>
      <p className="level-item is-disabled"><a>Small rooms</a></p>
      <p className="level-item is-disabled"><a>Conference rooms</a></p>
    </div>
  </nav>
);


export default SearchBar;

