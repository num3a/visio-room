import React, { Component } from 'react';

const SearchBar = (props) => (
    <div className="box">

        <nav className="level">
            <div className="level-left">
                <div className="level-item">
                    <p className="subtitle is-5">
                        <strong>{props.count}</strong> rooms
                    </p>
                </div>
                <div className="level-item">
                    <p className="control has-addons">
                        <input className="input" type="text" placeholder="Find a post" />
                        <button className="button">
                            Search
                        </button>
                    </p>
                </div>
            </div>
            <div className="level-right">
                <p className="level-item"><strong>All</strong></p>
                <p className="level-item"><a>Published</a></p>
                <p className="level-item"><a>Drafts</a></p>
                <p className="level-item"><a>Deleted</a></p>
            </div>
        </nav>
    </div>
);


export default SearchBar;

