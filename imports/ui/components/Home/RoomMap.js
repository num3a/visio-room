import React, { Component } from 'react';
import { GoogleMap, InfoWindow, Marker } from 'react-google-maps';

class  RoomMap extends Component {
  render() {
    return (<GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
      <Marker
        position={{ lat: -34.397, lng: 150.644 }}
        onClick={props.onToggleOpen}
      >
        {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen} />}
      </Marker>
    </GoogleMap>);
  }
}

export default RoomMap;
