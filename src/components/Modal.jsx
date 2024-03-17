import React from 'react';

const Modal = ({ imageUrl, alt, closeModal }) => {
  return (
    <div className="ModalOverlay" onClick={closeModal}>
      <div className="ModalContent">
        <img src={imageUrl} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;