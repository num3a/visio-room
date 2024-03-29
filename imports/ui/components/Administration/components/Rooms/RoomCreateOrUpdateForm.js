import React, { Component } from 'react';
import { getFirstEmail } from '../../../../../common/emailHelper';
import { DropDown, Input, Hidden } from '../../../common/Form';
import { getProp } from '../../../common/Form/Helpers';

import { createContainer } from 'meteor/react-meteor-data';
import { Partners } from '../../../../../api/partners/partners-collection';
import { Rooms } from '../../../../../api/rooms/rooms-collection';

class RoomCreateOrUpdateForm extends Component {
  onSubmitForm(e) {
    e.preventDefault();
    const email = getFirstEmail(Meteor.user());

    const room = {
      name: e.target.name.value,
      pricePerDay: Number(e.target.pricePerDay.value),
      partnerId: e.target.partnerId.value,
      address: e.target.address.value,
      capacity: Number(e.target.capacity.value),
      description: e.target.description.value,
      contactEmail: e.target.contactEmail.value,
      administrators: [email],
    };

    const id = e.target._id.value;
    if (id !== '' && id !== null && id !== undefined) {
      room._id = id;
    }

    Meteor.call('rooms.createOrUpdate', room, (err, result) => {
      if (err) {

      } else {
        this.props.history.push(`/admin/rooms/${result.id}`);
      }
    });
  }

  mapToDropDown(partners) {
    return partners.map(partner => ({
      text: partner.name,
      value: partner._id,
    }));
  }

  render() {
    if (this.props.loadingRoom && this.props.roomId) {
      return <div><p className="is-subtitle is-4">Loading ...</p></div>;
    }

    const room = this.props.room;

    return (<div className="container">
      <div className="box">
        <div>
          <h3 className="is-subtitle is-3">Rooms creation</h3>
        </div>
        <form onSubmit={event => this.onSubmitForm(event)}>
          <Hidden name="_id" value={getProp(room, '_id')} />
          <Input name="name" placeholder="Name" required defaultValue={getProp(room, 'name')} />
          <Input name="address" placeholder="Address" required defaultValue={getProp(room, 'address')} />
          <Input name="pricePerDay" type="number" placeholder="Price per day" required defaultValue={getProp(room, 'pricePerDay')} />
          <Input name="capacity" type="number" placeholder="Capacity" required defaultValue={getProp(room, 'capacity')} />
          <Input name="description" placeholder="Description" required defaultValue={getProp(room, 'description')} />
          <DropDown name="partnerId" placeholder="Partner " data={this.mapToDropDown(this.props.partners)} required defaultValue={getProp(room, 'partnerId')} />
          <Input name="contactEmail" type="email" placeholder="Email Contact" required defaultValue={getProp(room, 'contactEmail')} />
          <hr />
          <div className="field">
            { room ?
              <button type="submit" className="button is-primary">Update</button>
                    :
              <button type="submit" className="button is-primary">Create</button>
                  }
          </div>
        </form>
      </div>
    </div>);
  }
}

const RoomCreateOrUpdateFormContainer = createContainer(({ match }) => {
  const roomId = match.params.roomId;

  const roomHandle = Meteor.subscribe('rooms.byId', roomId);
  const partnerIdsHandle = Meteor.subscribe('partners.getIdWithName');

  const partners = Partners.find({}, { field: { _id: 1, name: 1 }, reactive: false }).fetch();
  const room = Rooms.findOne({ _id: roomId });

  return {
    loadingIds: !partnerIdsHandle.ready(),
    partners: partners || [],
    loadingRoom: !roomHandle.ready(),
    room,
    roomId,
  };
}, RoomCreateOrUpdateForm);

export default RoomCreateOrUpdateFormContainer;
