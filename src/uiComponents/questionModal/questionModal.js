/* eslint-disable react/jsx-no-target-blank */
import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';
import Recaptcha from 'react-recaptcha';

import arrow from '../../assets/arrow.png';
import './questionModal.css';

// importing helper function
import {getHint, answerQuestion, reCaptchaCheck} from '../../utils/userHelperFuncs'

// importing components
import { toastError } from '../toasts/toasts.js';

// create a variable to store the component instance
let recaptchaInstance;
 
// manually trigger reCAPTCHA execution
const executeCaptcha = function () {
    try {
        recaptchaInstance.execute();
    } catch (err) {
        console.log(err.message);
    }
};

const QuestionModal = ({isOpen, handleAnswerSubmit, closeModal, question, qid, hindUsed, onAnswerCorrect}) => {
    let [captchaRefreshCount, setCaptchaRefreshCount] = useState(0);
    const [confirm, setConfirm] = useState(false);
    const [hint, setHint] = useState('')
    const [answer, setAnswer] = useState('');
    const [token, setToken] = useState('');
    const [verified, setVerified] = useState(false);
    const [checking, setChecking] = useState(false);

    const verifyCallback = (token) => {
        if (token) {
            setToken(token);
            setVerified(true);
        }
        else {
            // toastError("ReCaptcha verification failed! Please reload page and attempt again!");
            closeModal();
        }
    }

    const expiredCallback = () => {
        console.log(++captchaRefreshCount);
        setCaptchaRefreshCount(++captchaRefreshCount);
        setToken('');
        setVerified(false);
        try {
            setTimeout(() => recaptchaInstance.execute(), 200);
        } catch (err) {
            // console.log(err.message);
            console.log("This is expired reCaptcha timing out")
            closeModal();
        }
    }

    const getHintFromAPI = async () => {
        try {
            const hint = await getHint(qid);
            setHint(hint);
        } catch (err) {
            console.log(err);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    }

    const checkAnswer = async () => {
        if (!verified) {
            toastError("Hey! Your reCaptcha expired, please reload this page before signing up. We are sorry for the inconvenience caused.");
        }
        setChecking(true);
        reCaptchaCheck(token)
            .then(() => answerQuestion(qid, answer))
            .then((check) => {
                if (check) {
                    onAnswerCorrect();
                    closeModal();
                    return;
                }
                toastError('Oops! Wrong Answer');
                recaptchaInstance.reset();
                recaptchaInstance.execute();
            })
            .catch((err) => {
                console.log(err);
                toastError(err.message ? err.message : err);
            })
            .finally(() => setChecking(false))
    }

    useEffect((hintUsed) => {
        if (isOpen) {
            setTimeout(() => {
                executeCaptcha();
            }, 1000);
        }
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
        }
    },
    [hindUsed, isOpen, qid]);

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
            <ToastContainer
                draggable
                position="bottom-right"
            />
            <div className="question_modal_title_container">
                <h3 className="question_modal__title">{question['name']} - 100 points</h3>
                <div className="question_modal_close_button" onClick={()=>closeModal()}>X</div>
            </div>
            <div className="modal__question">
                {question['description']}
            </div>
            <div className="modal__link">
                <a href={question['url']} target="_blank">Question Link</a>
            </div>
            <div className="question_modal__answer_container">
                <input type='text' className="modal__answer__input" placeholder="Answer here" value={answer} onChange={(event) => setAnswer(event.target.value)} onKeyDown={handleKeyDown}/>
                <div className="question_modal__answer__button" onClick={() => checkAnswer()}>
					<img src={arrow} className="img_answer" alt="" />
				</div>
            </div>
            {
                checking === true
                ?
                (<div className="question_modal__hint" >Checking...</div>)
                :
                renderHint()
            }
            <Recaptcha
                ref={e => recaptchaInstance = e}
                sitekey={process.env.REACT_APP_SITEKEY}
                render="explicit"
                size="invisible"
                verifyCallback={verifyCallback}
                expiredCallback={expiredCallback}
                onloadCallback={(res)=>{
                        console.log("Loaded captcha")
                }} 
            />
        </Modal>
    );
}

export default QuestionModal;
