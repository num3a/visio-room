import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createContainer} from 'meteor/react-meteor-data';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AddCard from './AddCard';
import { PaymentTokens } from '../../../api/payments/paymentTokens';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';

import { closeAddCardModal, openAddCardModal  } from '../../actions/payments';
const style = {
    marginRight: 20,
};

class Payments extends Component {

    _openAddCardDialog(){
        const { dispatch } = this.props;
        dispatch(openAddCardModal());
    }

    _handleCloseDialog(){
        const { dispatch } = this.props;
        dispatch(closeAddCardModal());
    }

    _renderDialog(){
        const { openAddPaymentModal, dispatch } = this.props;
        const customContentStyle = {
            height: '100%',
            maxHeight: 'none',
        };

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() => {this._handleCloseDialog()}}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => {this._handleCloseDialog()}}
            />,
        ];

        return (
            <Dialog
                title="Add a payment method"
                modal={false}
                open={openAddPaymentModal}
                contentStyle={customContentStyle}
                onRequestClose={() => {this._handleCloseDialog()}}
            >
                <AddCard/>
            </Dialog>
        );
    }

    _generateToken(){
        const options = {
            content: '',
            data: {},
            headers: {}
        };

        /*
         HTTP.call('POST', url, (error, result) => {

         }); */
    }

    _onDeleteClick(paymentToken){

    }

    _renderPayments(){
        const { loadingTokens, paymentTokens } =  this.props;
        if(loadingTokens){
            return <h3>Loading payments ..</h3>;
        }
        return paymentTokens.map((paymentToken) => {
            const { brand, expMonth, expYear, last4 } = paymentToken.card;

            return  <div key={paymentToken._id}>
                <Card>
                    <CardText>
                        Type: { brand }
                    </CardText>
                    <CardText>
                        Expiration date: { expMonth } / { expYear }
                    </CardText>
                    <CardText>
                        Number: **** **** **** {last4}
                    </CardText>
                    <CardActions>
                        <FlatButton label="Delete"  onClick={(paymentToken) => this._onDeleteClick(paymentToken)}/>
                    </CardActions>
                </Card>
            </div>;
        });
    }

    render(){
        return(<div>
            <div className="row">
                <h4>Payments</h4>
            </div>

            <FloatingActionButton style={style} onClick={()=>{this._openAddCardDialog()}}>
                <ContentAdd />
            </FloatingActionButton>
            <div className="row" >
                {this._renderPayments()}
            </div>
            <div className="row">
                {this._renderDialog()}
            </div>
        </div>);
    }
}


const PaymentsContainer = createContainer(() => {
    let userId = Meteor.userId();
    const tokenHandle = Meteor.subscribe('payments.tokenByUser', userId);
    const loading = !tokenHandle.ready();
    const paymentTokens = PaymentTokens.find({}).fetch();

    return {
        isAuthenticated: Meteor.userId(),
        currentUser: Meteor.user(),
        loadingTokens: loading,
        paymentTokens: paymentTokens,
    };
}, Payments);


const mapStateToProps = (state) => {
    return {
        openAddPaymentModal: state.payments.openAddPaymentModal,
    };
};

export default connect(mapStateToProps)(PaymentsContainer);