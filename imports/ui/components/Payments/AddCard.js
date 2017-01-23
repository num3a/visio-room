import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
//TODO: https://stripe.com/docs/quickstart#collecting-payment-information
//TODO: tokenize payments data
//TODO: save for later

class AddCard extends Component {
    render(){
        return <div>
            <form action="/your-charge-code" method="POST" id="payment-form">
                <span className="payment-errors"></span>

                <div className="form-row">
                        <TextField
                            hintText="Card Number"
                            size="20"
                            data-stripe="number"/>
                </div>

                <div className="form-row">
                        <TextField hintText="MM" size="2" data-stripe="exp_month"/>

                    <span> / </span>
                    <TextField hintText="YY" size="2" data-stripe="exp_year"/>
                </div>

                <div className="form-row">
                        <TextField hintText="CVC" size="4" data-stripe="cvc"/>
                </div>

                <div className="form-row">
                        <TextField hintText="Billing Postal Code" size="6" data-stripe="address_zip"/>
                </div>
                <FlatButton
                    label="Submit"
                    primary
                />

            </form>
        </div>;
    }
}

export default AddCard;