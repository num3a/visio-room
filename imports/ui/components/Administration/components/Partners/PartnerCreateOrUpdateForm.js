import React, { Component } from 'react';
import { Meteor }  from 'meteor/meteor';
import AutoForm from 'uniforms-unstyled/AutoForm';
import { createContainer } from 'meteor/react-meteor-data';
import { DropDown, Input, Hidden } from '../../../common/Form';
import { Partners } from '../../../../../api/partners/partners';
import { getProp } from '../../../common/Form/Helpers';

const PartnerSchema = Partners.schema;

const onSubmitForm = (doc) => {
  debugger;
  console.log(JSON.stringify(doc));


  //TODO: check id
  /*
  const id = doc._id.value;
  if (id !== '' && id !== null && id !== undefined) {
    doc._id = id;
  }
*/

  Meteor.call('partners.createOrUpdate', doc, (err, result) => {
    if (err) {

    } else {
      this.props.history.push(`/admin/partners/${result.id}`);
    }
  });
};

const PostForm = ({ model }) =>
  <AutoForm schema={PartnerSchema} onSubmit={onSubmitForm} model={model} />
;

class PartnerCreation extends Component {
  onSubmitForm(e) {
    e.preventDefault();

    const partner = {
      name: e.target.name.value,
      address: e.target.address.value,
      email: e.target.email.value,
      phoneNumber: e.target.phoneNumber.value,
    };

    const id = e.target._id.value;
    if (id !== '' && id !== null && id !== undefined) {
      partner._id = id;
    }

    Meteor.call('partners.createOrUpdate', partner, (err, result) => {
      if (err) {

      } else {
        this.props.history.push(`/admin/partners/${result.id}`);
      }
    });
  }

  render() {
    if (this.props.loading && this.props.partnerId) {
      return <div><p className="is-subtitle is-4">Loading ...</p></div>;
    }

    const partner = this.props.partner;

    return (<div className="container">
      <div className="box">
        <PostForm
          model={partner}
        />
      </div>
      {/*
      <div className="box">
        <div>
          <h3 className="is-subtitle is-3">Partners creation</h3>
        </div>
        <form onSubmit={event => this.onSubmitForm(event)}>
          <Hidden name="_id" value={getProp(partner, '_id')} />
          <Input name="name" placeholder="Partner Name" defaultValue={getProp(partner, 'name')} />
          <Input name="address" placeholder="Address" defaultValue={getProp(partner, 'address')} />
          <Input name="email" placeholder="Email" defaultValue={getProp(partner, 'email')} />
          <Input name="phoneNumber" placeholder="Phone" defaultValue={getProp(partner, 'phoneNumber')} />
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
      */}
    </div>);
  }
}
const PartnerCreationContainer = createContainer(({ match }) => {
  const partnerId = match.params.partnerId;
  const partnerHandle = Meteor.subscribe('partners.byId', partnerId);
  const partner = Partners.findOne({ _id: partnerId });

  return {
    loading: !partnerHandle.ready(),
    partner,
    partnerId,
  };
}, PartnerCreation);

export default PartnerCreationContainer;
