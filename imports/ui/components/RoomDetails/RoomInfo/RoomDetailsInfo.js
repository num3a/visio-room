import React, { Component } from 'react';
import {Card, CardHeader, CardMedia, CardText} from "material-ui/Card";


const RoomDetailsInfo = (props) =>
  <Card className="home-card">
    <CardHeader
      style={{ fontSize: 14 }}
    >
      {props.name}
    </CardHeader>
    <CardMedia>
      <img src={props.staticImageUrl}/>
    </CardMedia>
    <CardText>
      <p>
        Capacity: {props.capacity}
      </p>
      <p>
        Price: {props.pricePerDay}
      </p>
    </CardText>
    <CardText>
      {props.description}
    </CardText>
  </Card>;

export default RoomDetailsInfo;