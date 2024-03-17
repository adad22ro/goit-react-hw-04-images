// ImageGalleryItem.jsx
import React from 'react';
import * as basicLightbox from 'basiclightbox';

const ImageGalleryItem = ({ id, imageUrl, alt }) => {
  const openModal = () => {
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';

    const modalContent = `
      <div class="ModalOverlay">
        <div class="ModalContent">
          <img src="${imageUrl}" alt="${alt}" />
        </div>
        <span class="closeButton">×</span>
      </div>
    `;

    const instance = basicLightbox.create(modalContent, {
      onShow: (instance) => {
        // Add event listener to the close button inside the modal
        const closeButton = instance.element().getElementsByClassName('closeButton')[0];
        closeButton.addEventListener('click', () => {
          instance.close();
          // Restore body scrolling when the modal is closed
          document.body.style.overflow = 'auto';
        });

        // Add event listener to the overlay to close the modal when clicking outside of the image
        const overlay = instance.element().getElementsByClassName('ModalOverlay')[0];
        overlay.addEventListener('click', (event) => {
          if (event.target === overlay) {
            instance.close();
            // Restore body scrolling when the modal is closed
            document.body.style.overflow = 'auto';
          }
        });
      },
    });

    instance.show();
  };

  return (
    <li className="ImageGalleryItem" key={id}>
      <img
        src={imageUrl}
        alt={alt}
        className="ImageGalleryItem-image"
        onClick={openModal}
      />
    </li>
  );
};

export default ImageGalleryItem;
