import React from 'react';

import './infoScreen.css';
import ctfLogo from '../../assets/CTF.svg';
import amazonLogo from '../../assets/amazon.png';

const InfoScreen=()=> {
    return (
        <div className="info-container">
            <div className="info-card-container">
                <div className="info__ctf-logo">
                    <img src={ctfLogo} alt="" />
                </div>
                <div className="info__ctf-info">Capture The Flag a.k.a CTF is a cybersecurity competition conducted by IEEE VIT, designed to challenge you to solve computer security problems and/or capture and defend computer systems.</div>
									{
										/*
                <div className="info__sponsor-logo">
                    <img src={amazonLogo} alt="" />
                </div>
										*/
									}
                <div className="info__rules-container">
                    <dl>Instructions to follow</dl>
                    <dt>
                    <ul>
                        <li>For every correct answer without using hints you will be rewarded points according to the number of people who have solved the questions</li>
                        <li>For every correct answer after using hints you will be awarded points according to how many people have already solved the question minus hint penalty</li>
                        <li>Questions can be asnwered in any order</li>
                    </ul>
                    </dt>
                </div>
            </div>
        </div>
    );
}

export default InfoScreen;
