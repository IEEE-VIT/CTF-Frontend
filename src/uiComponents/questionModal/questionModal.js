import React from 'react';
import Modal from 'react-modal';

import arrow from '../../assets/arrow.png';
import './questionModal.css';

const QuestionModal=({isOpen, handleAnswerSubmit, closeModal})=>(
    <Modal 
    isOpen={!!isOpen} 
    onRequestClose={handleAnswerSubmit}
    contentLabel="Something"
    closeTimeoutMS={200}
    className="modal"
    >
    <div className="modal_title_container">
        <h3 className="modal__title">Question name - 100 points</h3>
        <div className="modal_close_button" onClick={()=>closeModal()}>X</div>
    </div>
    <div classname="modal__question">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    </div>
    <div className="modal__link">
        <a href="https://ieeevit.org">https://ieeevit.org</a>
    </div>
    <div className="modal__answer-container">
        <input type='text' className="modal__answer__input" placeholder="Answer here"/>
        <div className="modal__answer__button"><img src={arrow} alt="" /></div>
    </div>
    <div className="modal__hint">Use a hint</div>
    </Modal>
);

export default QuestionModal;