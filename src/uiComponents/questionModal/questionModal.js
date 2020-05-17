import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';

import arrow from '../../assets/arrow.png';
import './questionModal.css';

// importing helper function
import {getHint, answerQuestion} from '../../utils/userHelperFuncs'

const QuestionModal = ({setHomeScreenLoading, isOpen, handleAnswerSubmit, closeModal, question, qid, hindUsed}) => {
    const [confirm, setConfirm] = useState(false);
    const [hint, setHint] = useState('')
    const [answer, setAnswer] = useState('');
    const [respCheck, setCheck] = useState('');

    const getHintFromAPI = async () => {
        try {
            const hint = await getHint(qid);
            setHint(hint);
        } catch (err) {
            console.log(err);
        }
    }

    const checkAnswer = async () => {
        try {
            setHomeScreenLoading(true);
            const check = await answerQuestion(qid, answer);
            setCheck(check);
            setTimeout(() => {
                setHomeScreenLoading(false);
                closeModal();
            }, 2000);
        } catch (err) {
            console.log(err);
            setCheck('Wrong Answer');
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
            setAnswer('');
            setCheck('');
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
                <input type='text' className="modal__answer__input" placeholder="Answer here" value={answer} onChange={(event) => setAnswer(event.target.value)}/>
                <div className="question_modal__answer__button" onClick={() => checkAnswer()}><img src={arrow} className="img_answer" alt="" /></div>
            </div>
            <div>{respCheck}</div>
            {renderHint()}
        </Modal>
    );
}

export default QuestionModal;