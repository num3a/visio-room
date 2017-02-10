import React, { Component } from 'react';
import {connect} from "react-redux";
import Checkbox from 'material-ui/Checkbox';
import { cguAccepted } from '../../actions/room';

class CompletePayment extends Component {

    onCGUChange(isInputChecked){
        const { dispatch } = this.props;
        dispatch(cguAccepted(isInputChecked));
    }

    render(){
        return    <div className="row">
            <p>

                <span>By using the service, I accepts the <a target="_blank" href="/cgu">CGU</a></span>
            </p>

            <Checkbox
                label="I accept"
                onCheck={(event, isInputChecked) => {
                    this.onCGUChange(isInputChecked)}
                }
            />
        </div>
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

export default connect(mapStateToProps)(CompletePayment);
