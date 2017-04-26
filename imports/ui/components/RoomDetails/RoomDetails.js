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
  <div className="container">
    <div className="columns">
      <div className="column is-6 is-hidden-mobile">
        <div className="image is-2by2">
          {/* <img src={props.bigPicture} />*/}
          <ImageGallery
            items={images}
            slideInterval={5000}
            showBullets
          />
        </div>
      </div>
      <div className="column is-5 is-offset-1">
        <div className="title is-2">{props.name}</div>
        <p className="title is-3 has-text-muted">{props.pricePerDay} €</p>
        <hr />
        <br />
        <div className="image is-2by2 is-hidden-tablet" style={marginBottom}>
          {/* <img src={props.bigPicture} />*/}
          <ImageGallery
            items={images}
            slideInterval={5000}
            showBullets
          />
        </div>
        <p className="">
          <i className="fa fa-star title is-5" style={starColor} />
          <i className="fa fa-star title is-5" style={starColor} />
          <i className="fa fa-star title is-5" style={starColor} />
          <i className="fa fa-star title is-5" />
          <i className="fa fa-star title is-5" />
                  &nbsp; &nbsp;
          <strong>41 Reviews</strong>
                  &nbsp; &nbsp;
          <a href="#">show all</a>
        </p>
        <br />
        <p>
          {props.description}
        </p>
        <br />
        <br />
        <p className="has-text-centered">
          <a className="button is-primary is-medium" onClick={props.toggle}>See availability</a>
        </p>
      </div>
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
