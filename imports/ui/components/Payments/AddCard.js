import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { closeAddCardModal, openAddCardModal  } from '../../actions/payments';
import {connect} from 'react-redux';

//TODO: https://stripe.com/docs/quickstart#collecting-payment-information

class AddCard extends Component {
    _submitCard(event, data){
        event.preventDefault();
        const { dispatch } = this.props;

        Stripe.setPublishableKey('pk_test_P5K1hZO06CiDNwcRdTGJrhzp');
        let form = event.target;
        Stripe.card.createToken(form
           /* {
            card: {
                number: '4973559980575725',
                exp_month : 12,
                exp_year: 2018,
                cvc: '123',
                name: 'toto'
            }
        }*/
        , (resultCode, result) =>{
            // asynchronously called
            console.log('err:', resultCode);
            console.log('token', result);

            if(resultCode === 200){

                const { id, type, client_ip, created, card } = result;
                const { exp_month, exp_year, last4, brand } = card;
                let tokenToSave = {
                    token: id,
                    type: type,
                    clientIp : client_ip,
                    created : created,
                    expired: false,
                    card: {
                        id: card.id,
                        expMonth: exp_month,
                        expYear: exp_year,
                        last4: last4,
                        brand: brand,
                    }
                };

                Meteor.call('payments.saveToken', tokenToSave, (error, result) => {
                    console.log('payments.saveToken.error', error);
                    console.log('payments.saveToken.result', result);
                    if(result.saved === true){
                        dispatch(closeAddCardModal());
                    }
                })
            }
        });

        /*
         {
         token: { type: String},
         type: { type: String },
         clientIp: { type: String },
         created: { type: Number}
         }
        * */
    }
    render(){
        return <div>
            <form action="/your-charge-code" method="POST" id="payment-form" onSubmit={(event, data) => this._submitCard(event, data)}>
                <span className="payment-errors"></span>

                <div className="form-row">
                        <TextField
                            hintText="Card Number"
                            size="20"
                            value="4000000000000077"
                            data-stripe="number"/>
                </div>

                <div className="form-row">
                        <TextField
                            value={10}
                            hintText="MM" size="2" data-stripe="exp_month"/>

                    <span> / </span>
                    <TextField hintText="YY"
                               value={2018}

                               size="2" data-stripe="exp_year"/>
                </div>

                <div className="form-row">

                    <TextField
                        value={133}

                        hintText="CVC" size="4" data-stripe="cvc"/>
                </div>

                <div className="form-row">
                        <TextField
                            value={100023}
                            hintText="Billing Postal Code" size="6" data-stripe="address_zip"/>
                </div>
                <FlatButton
                    label="Submit"
                    primary
                    type="submit"
                />

            </form>
        </div>;
    }
}
const mapStateToProps = (state) => {
    return {
    };
};
export default connect(mapStateToProps)(AddCard);