import React, { Component } from 'react';
import BookingManager from './BookingManager';
import RoomSelector from './RoomSelector';

class BookingPanel extends Component {
  render() {
    return (<div>
      <RoomSelector />
      <BookingManager />
    </div>);
  }
}

export default BookingPanel;

