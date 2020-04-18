import React, { Component } from 'react';
import 'firebase';

// importing StyleSheets
import './landingScreen.css';
import '../../Styles.css';

import { pingServer } from '../../utils/userHelperFuncs';

class LandingScreen extends Component {

    componentDidMount() {
        pingServer();

        const W = window.innerWidth;
        const H = window.innerHeight

        function updateAnimationTiming() {
            const animationDuration = 5 + Math.random() * 5; // [5 - 10)
            const animationDelay = 5 + Math.random() * 10; // [5 - 15)
            
            window.requestAnimationFrame(() => {
                document.getElementById("animatedContainer").style.setProperty('--animationDuration', animationDuration + 's');
                document.getElementById("animatedContainer").style.setProperty('--animationDelay', animationDelay + 's');
            });
            
            const timeout = (animationDuration + animationDelay) * 1000 - 100;
            
            setTimeout(updateAnimationTiming, timeout);
        }

        updateAnimationTiming();

        document.addEventListener('mousemove', e => {
        window.requestAnimationFrame(() => {
            const X = e.clientX;
            const Y = e.clientY;

            document.getElementById("animatedContainer").style.setProperty('--cursorX', X + 'px');
            document.getElementById("animatedContainer").style.setProperty('--cursorY', Y + 'px');

            const X2 = X - (12 * W / 100) * (X / W - 0.5);
            const Y2 = Y - (12 * W / 100) * (Y / H - 0.5);

            document.getElementById("animatedContainer").style.setProperty('--cursorX2', X2 + 'px');
            document.getElementById("animatedContainer").style.setProperty('--cursorY2', Y2 + 'px');
        });
        });
    }

    render() {
        return (
            <div className="mainContainer" id="animatedContainer">
                <img className="ctfLogo" src={require('../../assets/ctfLogo.png')} alt="CTF Logo" height={260} />
                <div className="button loginBtn" onClick={() => window.location.href = '/getStarted'}>Play</div>
            </div>
        );
    }
}


export default LandingScreen;
