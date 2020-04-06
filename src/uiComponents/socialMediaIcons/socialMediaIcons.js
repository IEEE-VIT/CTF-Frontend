import React from 'react';

import facebookLogo from '../../assets/facebook.png';
import instaLogo from '../../assets/insta.png';
import twitterLogo from '../../assets/twitter.png';

import './socialMediaIcons.css';

const SocialMediaIcons=()=> {
    return (
        <div className="social-media-icons-container">
            <a href="https://www.facebook.com/IEEEVIT/" className="icons">
                <img src={facebookLogo} alt=""/>
            </a>
            <a href="https://www.instagram.com/ieeevitvellore/" className="icons">
                <img src={instaLogo} alt=""/>
            </a>
            <a href="https://twitter.com/ieeevitvellore" className="icons">
                <img src={twitterLogo} alt=""/>
            </a>
        </div>
    );
}

export default SocialMediaIcons;
