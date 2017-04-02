import React, { Component } from 'react';
import AutoForm from 'uniforms-unstyled/AutoForm';
import { Rooms } from '../../../../../api/rooms/rooms';

class AutoFormPartnerCreation extends Component {
    constructor(model){
        super();
    }
    saveModel(doc){
        debugger;
    }
    render(){
        return (<AutoForm schema={Rooms.schema} onSubmit={doc => Rooms.insert(doc)} />);
    }
}

export default AutoFormPartnerCreation;