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
                <div className="info__ctf-info">Capture The Flag a.k.a CTF is a cybersecurity competition conducted by IEEE VIT, designed to challenge you to solve computer security problems and/or capture and defend computer systems. CTF ‘20 is sponsored by Amazon.</div>
                <div className="info__sponsor-logo">
                    <img src={amazonLogo} alt="" />
                </div>
                <div className="info__rules-container">
                    <dl>Instructions to follow</dl>
                    <dt>
                    <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    </ul>
                    </dt>
                </div>
            </div>
        </div>
    );
}

export default InfoScreen;