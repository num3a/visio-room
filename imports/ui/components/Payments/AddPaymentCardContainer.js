import React, { Component } from 'react';
import AddPaymentCard from './AddPaymentCard';
import { closeAddCardModal, loadingAddCard } from '../../actions/payments';
import { connect } from 'react-redux';

class AddPaymentCardContainer extends Component {
    submitCard(event, data){
        event.preventDefault();
        const { dispatch } = this.props;

        dispatch(loadingAddCard(true));

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

                    Meteor.apply('payments.saveToken',[tokenToSave], { noRetry: true}, (error, result) => {

//                    Meteor.call('payments.saveToken', tokenToSave, (error, result) => {
                        console.log('payments.saveToken.error', error);
                        console.log('payments.saveToken.result', result);
                        if(result.saved === true){
                            dispatch(closeAddCardModal());
                            dispatch(loadingAddCard(false));

                        }
                    })
                }
                else {
                    dispatch(loadingAddCard(true));

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
        return <AddPaymentCard
            onSubmit={(event, data) => this.submitCard(event, data)}
            loading={this.props.loadingAddCard}
        />;
    }
}


const mapStateToProps = (state) => {
    return {
        loadingAddCard: state.payments.loadingAddCard,
    };
};
export default connect(mapStateToProps)(AddPaymentCardContainer);

