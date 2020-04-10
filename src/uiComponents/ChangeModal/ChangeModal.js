import React, { useState } from 'react';
import Modal from 'react-modal';

// importing styles
import './ChangeModal.css';
 
const ChangeModal = ({ title, type, modalIsOpen, closeModal, onSubmitName }) => {
  const [nameInput, setNameInput] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitName(nameInput.value);
  }

  console.log(modalIsOpen)
 
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="changeModal"
            contentLabel="Example Modal"
        >
          <div className="modal_title_container">
          <h3 className="modal__title">{ title }</h3>
            <div className="modal_close_button" onClick={()=>closeModal()}>x</div>
          </div>
          <div className="modal__answer-container">
            <div classname="modal__question">
              {
                type === "name_modal"
                ?
                "Enter Your Name Below"
                :
                type === "username_modal"
                ?
                "We have assigned you a default username! Take a minute to change it."
                :
                "Error"
              }
            </div>
            <input type='text' className="modal__name_input" placeholder="Your name here" ref={(c) => setNameInput(c)} />
            <div className="ChangeButton login button" onClick={onSubmit}>Set Name</div>
          </div>
      </Modal>
    );
};

export default ChangeModal;
