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
        className="question_modal"
    >
        <div className="question_modal_title_container">
            <h3 className="question_modal__title">{question['name']} - 100 points</h3>
            <div className="question_modal_close_button" onClick={()=>closeModal()}>X</div>
        </div>
        <div className="modal__question">
            {/* {question['description']} */}
            Model Question Model Question Model Question Model Question Model Question Model Question Model Question Model Question Model Question
        </div>
        <div className="modal__link">
            <a href="https://ieeevit.org">{question['url']}</a>
        </div>
        <div className="question_modal__answer_container">
            <input type='text' className="modal__answer__input" placeholder="Answer here"/>
            <div className="question_modal__answer__button"><img src={arrow} alt="" /></div>
        </div>
        <div className="question_modal__hint">Use a hint</div>
    </Modal>
);

export default QuestionModal;