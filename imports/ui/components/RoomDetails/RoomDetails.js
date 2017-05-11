import React from 'react';
import ImageGallery from 'react-image-gallery';
import PropTypes from 'prop-types';
import 'react-image-gallery/styles/css/image-gallery.css';

const width = { width: '40px' };
const starColor = { color: '#ed6c63' };
const marginBottom = { marginBottom: '15px' };

const images = [
  {
    original: 'http://cdn-s3.bureauspot.com/uploads/photo/image/488/meero_photographe_immobilier-18.jpg',
    thumbnail: 'http://cdn-s3.bureauspot.com/uploads/photo/image/488/meero_photographe_immobilier-18.jpg',
  },
  {
    original: 'http://cdn-s3.bureauspot.com/uploads/photo/image/486/meero_photographe_immobilier-26.jpg',
    thumbnail: 'http://cdn-s3.bureauspot.com/uploads/photo/image/486/meero_photographe_immobilier-26.jpg',
  },
  {
    original: 'http://cdn-s3.bureauspot.com/uploads/photo/image/487/meero_photographe_immobilier-23.jpg',
    thumbnail: 'http://cdn-s3.bureauspot.com/uploads/photo/image/487/meero_photographe_immobilier-23.jpg',
  },
  {
    original: 'http://cdn-s3.bureauspot.com/uploads/photo/image/749/photo1-94952.jpg',
    thumbnail: 'http://cdn-s3.bureauspot.com/uploads/photo/image/749/photo1-94952.jpg',
  },
];

const RoomDetails = props => (

  <div className="column is-6">
    <div className="box">
      <div className="title is-2">{props.name}</div>
      {/*
       <p className="title is-3 has-text-muted">{props.pricePerDay} €</p>
       */}
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
