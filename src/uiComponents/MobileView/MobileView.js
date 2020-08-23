import React from 'react';

//import firebase
import firebase from '../../configs/firebase';

import './MobileView.css';

class MobileView extends React.Component {
    
    openLogModal = () => {
        firebase.auth().signOut()
            .then((resp) => {
                console.log(resp);
                window.location.href ="/"
                return;
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    isLoading: false,
                });
                return;
            })
    }

    render() {
        return(
            <div className = 'mobile-view-container'>
                <h4>Please visit the website on a desktop.</h4>
                <div className="button loginBtn" onClick={() => this.openLogModal()}>Fine, log me out</div>
            </div>
        );
    }
}

export default MobileView;