import React from 'react';
import Modal from 'react-modal';

// importing styles
import './LogOutModal.css';
 
const LogOutModal = ({ modalIsOpen, closeModal, onLogOut }) => {
 
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="changeModal"
            contentLabel="Example Modal"
        >
          <div className="modal_title_container">
          <h3 className="modal__title">Log Out Request</h3>
            <div className="modal_close_button" onClick={()=>closeModal()}>x</div>
          </div>
          <div className="modal__answer-container">
            <div classname="modal__question">
              Are you sure, you want to log out?
            </div>
            <div className="logOutBtn login button" onClick={onLogOut}>Yes, log out</div>
          </div>
      </Modal>
    );
};

export default LogOutModal;
