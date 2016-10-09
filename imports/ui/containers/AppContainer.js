import React, { Component } from 'react';

const AppContainer = (props) => (
    <div>
        <h1>THIS IS VISIO ROOM</h1>
        <div>
            {props.children}
        </div>
    </div>
);

export default AppContainer;