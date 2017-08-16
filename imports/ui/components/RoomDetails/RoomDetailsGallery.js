import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';

const images = [
  {
    original: 'http://cdn-s3.bureauspot.com/uploads/photo/image/488/meero_photographe_immobilier-18.jpg',
    thumbnail: 'http://cdn-s3.bureauspot.com/uploads/photo/image/488/meero_photographe_immobilier-18.jpg',
  },
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

const RoomDetailsGallery = props => (
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
);

export default RoomDetailsGallery;
