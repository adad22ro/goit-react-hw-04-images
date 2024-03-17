// ImageGallery.jsx
import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ images, loadMore }) => (
  <div>
    <ul className="ImageGallery">
      {images.map(image => (
        <ImageGalleryItem key={image.id} {...image} />
      ))}
    </ul>
    <div className='SectionButton'>
      {images.length > 0 && (
        <button className="Button" onClick={loadMore}>
          Load more
        </button>
      )}
    </div>
  </div>
);

export default ImageGallery;
