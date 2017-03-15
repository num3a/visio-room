import React, { Component } from 'react';

const ProfileInformations = (props) => (
        <div className="card is-fullwidth">
            <header className="card-header">
            </header>
            <div className="card-content">
                <a className="card-avatar">
                    <img src={props.avatar} className="card-avatar-img" />
                </a>

                <div className="card-user">
                    <div className="card-user-name">
                        <a href="#">{props.firstName} {props.lastName}</a>
                    </div>
                </div>
            </div>
        </div>
);

export default ProfileInformations;