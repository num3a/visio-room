import React, { Component } from 'react';
import { closeForgotPasswordModal } from '../../actions/accounts';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from "react-redux";
import { createContainer } from 'meteor/react-meteor-data';

import { Accounts } from 'meteor/accounts-base';
import { getFirstEmail } from '../../../common/emailHelper';

class ForgotPasswordContainer extends Component {
    onSubmitEmail(event){
        debugger;
        event.preventDefault();

        //const email = getFirstEmail(this.props.currentUser);
        let email = event.target.email.value;

        const options = {
            email: email
        };

        Accounts.forgotPassword(options,(error) => {
            //TODO: wrap Accounts UI with bulma https://www.meteor.com/tutorials/react/adding-user-accounts

            if(error){
                console.log('An error occurs', err);
            }
            else {
                const { dispatch } = this.props;
                dispatch(closeForgotPasswordModal());
            }
        });
    }

    render(){
        return   <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <form onSubmit={(event) => this.onSubmitEmail(event)}>
                    <TextField
                        name="email"
                        hintText="Email"
                        floatingLabelText="Email"
                        type="email"
                    />

                    <RaisedButton type="submit" label="Submit" secondary={true}/>
                </form>
            </div>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(ForgotPasswordContainer);