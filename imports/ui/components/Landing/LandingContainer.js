import React, { Component } from 'react';
import { connect } from 'react-redux';
import {createContainer} from "meteor/react-meteor-data";
import Landing from "./Landing";

class Land extends Component {
    render(){
        return <Landing/>;
    }
}

const LandingContainer = createContainer(() => {
    return {

    };
}, Land);

const mapStateToProps = (state) => {
    return {

    };
};

export default connect(mapStateToProps)(LandingContainer);
