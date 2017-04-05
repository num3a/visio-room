import React, { Component } from 'react';
import { getFirstEmail } from '../../../../../common/emailHelper';
import { DropDown, Input } from "../../../common/Form";
import {createContainer} from "meteor/react-meteor-data";
import { Partners } from '../../../../../api/partners/partners';
class RoomCreateOrUpdateForm extends Component {
    onSubmitForm(e){
        e.preventDefault();
        debugger;
        let email = getFirstEmail(Meteor.user());

        let room = {
            name: e.target.name.value,
            pricePerDay: Number(e.target.pricePerDay.value),
            partnerId: e.target.partnerId.value,
            address: e.target.address.value,
            capacity: Number(e.target.capacity.value),
            description: e.target.description.value,
            contactEmail: e.target.contactEmail.value,
            administrators:  [email],
        };
        //TODO:
        debugger;

        Meteor.call('rooms.createOrUpdate', room, (err, result) => {
            debugger;
        });
    }

    mapToDropDown(partners){
        return partners.map((partner) => {
            return {
                text: partner.name,
                value: partner._id,
            };
        })
    }

    render(){
        return <div className="container">
            <div className="box">
                <div>
                    <h3 className="is-subtitle is-3">Partners creation</h3>
                </div>
                <form onSubmit={(event) => this.onSubmitForm(event)}>
                    <Input  name="name" placeholder="Name" required/>
                    <Input name="address" placeholder="Address" required/>
                    <Input name="pricePerDay" type="number" placeholder="Price per day" required/>
                    <Input name="capacity" type="number" placeholder="Capacity" required/>
                    <Input name="description" placeholder="Description" required/>
                    <DropDown name="partnerId" placeholder="Partner " data={this.mapToDropDown(this.props.partners)} required/>
                    <Input name="contactEmail" type="email" placeholder="Email Contact" required/>
                    <hr />
                    <div className="field">
                        <button type="submit" className="button is-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>;
    }
}

const RoomCreateOrUpdateFormContainer = createContainer(() => {
    const partnerIdsHandle = Meteor.subscribe('partners.getIdWithName');
    let partners = Partners.find({},{field: { _id: 1, name: 1 }, reactive: false}).fetch();

    return {
        loadingIds : !partnerIdsHandle.ready(),
        partners: partners || [],
    };
}, RoomCreateOrUpdateForm);

export default RoomCreateOrUpdateFormContainer;