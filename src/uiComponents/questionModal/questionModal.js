import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';

import arrow from '../../assets/arrow.png';
import './questionModal.css';

// importing helper function
import {getHint} from '../../utils/userHelperFuncs'

const QuestionModal = ({isOpen, handleAnswerSubmit, closeModal, question, qid, hindUsed}) => {
    const [confirm, setConfirm] = useState(false);
    const [hint, setHint] = useState('')

    const getHintFromAPI = async () => {
        try {
            const hint = await getHint(qid);
            setHint(hint);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect((hintUsed) => {
        const getData = async () => {
            try {
                const hint = await getHint(qid);
                setHint(hint);
            } catch (err) {
                console.log(err);
            }
        }
        if (hintUsed) {
            getData();
            return;
        } else {
            setHint('');
            setConfirm(false);
        }
    },
    [hindUsed, qid]);

    const renderHint = () => {

        if (hint !== '') {
            return <div style={{alignSelf: 'center'}}>Hint: {hint}</div>
        }
       
        if (confirm) {
            return (
                <div style={{alignSelf: 'center'}}>
                    <div className="question_modal__hint" onClick={() => getHintFromAPI()}>I need this hint</div>
                    <div className="question_modal__hint" onClick={() => setConfirm(false)}>Nah, will try more</div>
                </div>
            );
        }

        return (
            <div className="question_modal__hint" onClick={() => setConfirm(true)}>Use a hint</div>
        );
    }
    
    return (
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
                {question['description']}
            </div>
            <div className="modal__link">
                <a href="https://ieeevit.org">{question['url']}</a>
            </div>
            <div className="question_modal__answer_container">
                <input type='text' className="modal__answer__input" placeholder="Answer here"/>
                <div className="question_modal__answer__button"><img src={arrow} alt="" /></div>
            </div>
            {renderHint()}
        </Modal>
    );
}

export default QuestionModal;