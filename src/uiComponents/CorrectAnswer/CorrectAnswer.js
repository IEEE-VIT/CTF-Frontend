import React from 'react';
import Modal from 'react-modal';

import './correctAnswer.css';

const CorrectAnswer = ({isOpenAnswer, closeModalAnswer}) => {

    return (
        <Modal 
            isOpen={!!isOpenAnswer}
            closeTimeoutMS={200}
            className="answer_modal"
        >
            <div className="answer_modal_title_container">
                <h3 className="answer_modal__title">Correct Answer</h3>
                <div className="answer_modal_close_button" onClick={() => closeModalAnswer()}>X</div>
            </div>
            <div className="modal__answer">
                Congratulations Your Answer Was Correct
            </div>
            <div className="continueBtn" onClick={() => closeModalAnswer()}>Continue</div>
        </Modal>
    );
}

export default CorrectAnswer;