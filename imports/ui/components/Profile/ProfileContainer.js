import React, { Component } from 'react';
import {connect} from "react-redux";
import { createContainer } from 'meteor/react-meteor-data';
import Avatar from "material-ui/Avatar";
import HistoryContainer from "../History/HistoryContainer";

class Profile extends Component {
    _renderProfileInfo(){
        if(!this.props.currentUser){
            return <div></div>;
        }
        else {
            const headline = this.props.currentUser.profile.headline;
            return (<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <h5>Headline</h5>
                <p>{headline}</p>
            </div>);
        }
    }
    _renderProfileHeader(){
        if(!this.props.currentUser){
            return <div></div>;
        }
        else {
            let { currentUser } = this.props;
            const profile = currentUser.profile;

            const avatar = profile.pictureUrl ?
                <Avatar src={profile.pictureUrl} /> :
                <Avatar size={75}>{profile.firstName[0].toUpperCase()}{profile.lastName[0].toUpperCase()}</Avatar>;

            return(
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    {avatar}
                    <p>{profile.firstName} {profile.lastName}</p>
                </div>
            );
        }
    }

    render(){
        if(!this.props.isAuthenticated){
            return <h1>Please login...</h1>;
        }
        else{
            return (
                <div>
                    <div className="row">
                        {this._renderProfileHeader()}
                    </div>
                    <div className="row">
                        <HistoryContainer />
                    </div>
                </div>

            );
        }
    }
}

const ProfileContainer = createContainer(() => {
    return {
        isAuthenticated: Meteor.userId(),
        currentUser: Meteor.user(),
    };
}, Profile);

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(ProfileContainer);