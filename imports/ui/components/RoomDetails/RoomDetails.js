import React from 'react';
import ImageGallery from 'react-image-gallery';
import PropTypes from 'prop-types';
import 'react-image-gallery/styles/css/image-gallery.css';

const width = { width: '40px' };
const starColor = { color: '#ed6c63' };
const marginBottom = { marginBottom: '15px' };

const images = [
  {
    original: 'http://lorempixel.com/1000/600/nature/1/',
    thumbnail: 'http://lorempixel.com/250/150/nature/1/',
  },
  {
    original: 'http://lorempixel.com/1000/600/nature/2/',
    thumbnail: 'http://lorempixel.com/250/150/nature/2/',
  },
  {
    original: 'http://lorempixel.com/1000/600/nature/3/',
    thumbnail: 'http://lorempixel.com/250/150/nature/3/',
  },
];

const RoomDetails = props => (

      <div className="column is-6">
        <div className="title is-2">{props.name}</div>
        <p className="title is-3 has-text-muted">{props.pricePerDay} €</p>
        <hr />
        <br />
        <div className="image is-2by2" style={marginBottom}>
          {/* <img src={props.bigPicture} />*/}
          <ImageGallery
            items={images}
            slideInterval={5000}
            showBullets
          />
        </div>
      </div>
);

RoomDetails.propType = {
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pricePerDay: PropTypes.number.isRequired,
  bigPicture: PropTypes.string,
  toggle: PropTypes.func.isRequired,
};

export default RoomDetails;
