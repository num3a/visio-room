import React, {Component} from "react";
import {connect} from "react-redux";
import {createContainer} from "meteor/react-meteor-data";

class Administration extends Component {
    render(){
        return <div>
            <h2>Rooms</h2>
        </div>;
    }
}

const AdministrationContainer = createContainer(() => {

    return {
        isAuthenticated: Meteor.userId(),
        currentUser: Meteor.user(),
    };
}, Administration);

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(AdministrationContainer);