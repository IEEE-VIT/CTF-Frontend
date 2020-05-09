import React from 'react';
import Modal from 'react-modal';

import arrow from '../../assets/arrow.png';
import './questionModal.css';

const QuestionModal=({isOpen, handleAnswerSubmit, closeModal, question})=>(
    <Modal 
        isOpen={!!isOpen} 
        onRequestClose={handleAnswerSubmit}
        contentLabel={question['description']}
        closeTimeoutMS={200}
        className="modal"
    >
        <div className="modal_title_container">
            <h3 className="modal__title">{question['name']} - 100 points</h3>
            <div className="modal_close_button" onClick={()=>closeModal()}>X</div>
        </div>
        <div className="modal__question">
            {/* "Lorem ipsum dolor sit amet, consectetur adipiscing elit." */}
            {question['description']}
        </div>
        <div className="modal__link">
            <a href="https://ieeevit.org">{question['url']}</a>
        </div>
        <div className="modal__answer-container">
            <input type='text' className="modal__answer__input" placeholder="Answer here"/>
            <div className="modal__answer__button"><img src={arrow} alt="" /></div>
        </div>
        <div className="modal__hint">Use a hint</div>
    </Modal>
);

export default QuestionModal;