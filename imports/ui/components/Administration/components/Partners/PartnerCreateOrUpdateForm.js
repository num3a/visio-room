import React, { Component } from 'react';
import { DropDown, Input, Hidden } from "../../../common/Form";
import {createContainer} from "meteor/react-meteor-data";
import { Partners } from '../../../../../api/partners/partners';
import { getProp } from "../../../common/Form/Helpers";

class PartnerCreation extends Component {
  onSubmitForm(e){
    e.preventDefault();

    let partner = {
      name: e.target.name.value,
      address: e.target.address.value,
      email: e.target.email.value,
      phoneNumber: e.target.phoneNumber.value,
    };

    const id = e.target._id.value;
    if(id !== '' && id !== null && id !== undefined){
      partner._id = id;
    }

    Meteor.call('partners.createOrUpdate', partner, (err, result) => {
      if(err){

      }  else {
        this.props.history.push(`/admin/partners/${result.id}`);
      }
    });
  }

  render(){
    if(this.props.loading && this.props.partnerId){
      return <div><p className="is-subtitle is-4">Loading ...</p></div>;
    }

    let partner = this.props.partner;

    return <div className="container">
        <div className="box">
            <div>
                <h3 className="is-subtitle is-3">Partners creation</h3>
            </div>
            <form onSubmit={(event) => this.onSubmitForm(event)}>
                <Hidden name="_id" value={getProp(partner, '_id')}/>
                <Input name="name" placeholder="Partner Name" defaultValue={getProp(partner,'name')}/>
                <Input name="address" placeholder="Address" defaultValue={getProp(partner,'address')}/>
                <Input name="email" placeholder="Email" defaultValue={getProp(partner,'email')}/>
                <Input name="phoneNumber" placeholder="Phone" defaultValue={getProp(partner,'phoneNumber')}/>
                <hr />
                <div className="field">
                  { partner ?
                    <button type="submit" className="button is-primary">Update</button>
                    :
                    <button type="submit" className="button is-primary">Create</button>
                  }
                </div>
            </form>
        </div>
    </div>;

  }
}
const PartnerCreationContainer = createContainer(({ match }) => {
  let partnerId = match.params.partnerId;
  let partnerHandle = Meteor.subscribe('partners.byId', partnerId);
  let partner = Partners.findOne({_id: partnerId});

  return {
    loading: !partnerHandle.ready(),
    partner: partner,
    partnerId: partnerId,
  };
}, PartnerCreation);

export default PartnerCreationContainer;