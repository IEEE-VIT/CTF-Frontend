import React from 'react';

import facebookLogo from '../../assets/facebook.png';
import instaLogo from '../../assets/insta.png';
import twitterLogo from '../../assets/twitter.png';

import './socialMediaIcons.css';

const SocialMediaIcons=()=> {
    return (
        <div className="social-media-icons-container">
            <div className="icons">
                <img src={facebookLogo} alt=""/>
            </div>
            <div className="icons">
                <img src={instaLogo} alt=""/>
            </div>
            <div className="icons">
                <img src={twitterLogo} alt=""/>
            </div>
        </div>
    );
}

export default SocialMediaIcons;
