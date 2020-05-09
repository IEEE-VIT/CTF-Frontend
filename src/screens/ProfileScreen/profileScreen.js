import React from 'react';
import LoadingScreen from 'react-loading-screen';
import { ToastContainer } from 'react-toastify';

// importing components
import ChangeModal from '../../uiComponents/ChangeModal/ChangeModal.js';
import LogOutModal from '../../uiComponents/LogOutModal/LogOutModal.js'
import { toastError, toastSuccess } from '../../uiComponents/toasts/toasts.js';



import './profileScreen.css';
import rankIcon from '../../assets/rank.png';
import pointsIcon from '../../assets/points.png';
import flagsIcon from '../../assets/flags.png';
import editIcon from '../../assets/edit.png';

//import firebase
import firebase from '../../configs/firebase';

// importing utils
import { getUserProfile } from '../../utils/userHelperFuncs';
import { updateName } from '../../utils/firebaseHelperFuncs';

// importing styles
import '../../Styles.css';

class ProfileScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: firebase.auth().currentUser.displayName,
            email: firebase.auth().currentUser.email,
            userProfile: null,
            isLoading: true,
            isChangeModalOpen: false,
            isLogOutModalOpen: false,
        }
    }

    async componentDidMount() {
        const uid = firebase.auth().currentUser.uid;
        try {
            const userProfile = await getUserProfile(uid);
            console.log(userProfile);
            this.setState({
                userProfile,
                isLoading: false,
            });
        } catch (err) {
            alert("Oops! We couldn't retrieve your profile details. Please try again later!")
        }
    }

    openChangeModel = () => {
        this.setState({
            isChangeModalOpen: true,
        })
    }

    closeChangeModal = () => {
        this.setState({
            isChangeModalOpen: false,
        })
    }

    openLogModal = () => {
        this.setState({
            isLogOutModalOpen: true,
        })
    }

    closeLogModal = () => {
        this.setState({
            isLogOutModalOpen: false,
        })
    }

    onSubmitName = (name) => {
        // check parameters
        if (name.length > 60 || name.length < 4) {
            return toastError("Your username needs to be 4-60 characters long!");
        }

        updateName(name)
            .then(() => {
                toastSuccess("Your name was successfully updated");
                const user = firebase.auth().currentUser;
                this.setState({
                    name: user.displayName,
                })
                this.closeChangeModal();
            })
            .catch((err) => {
                console.log(err);
                toastError(err.message);
            })
    }

    onLogOut = () => {
        this.setState({
            isLoading: true,
        });
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
        const { name, email, userProfile, isChangeModalOpen, isLogOutModalOpen, isLoading} = this.state;

        if (isLoading) {
            return (
                <LoadingScreen
                    loading={isLoading}
                    bgColor='black'
                    spinnerColor='blue'
                    logoSrc={require('../../assets/ctfLogo.png')}
                /> 
            );
        }

        return (
            <div className="profile-container">
                <ToastContainer
                    draggable
                    position="bottom-right"
                />
                <ChangeModal
                    title="Change Your Name"
                    type="name_modal"
                    modalIsOpen={isChangeModalOpen}
                    closeModal={this.closeChangeModal}
                    onSubmitName={this.onSubmitName}
                />
                <LogOutModal
                    modalIsOpen={isLogOutModalOpen}
                    onLogOut={this.onLogOut}
                    closeModal={this.closeLogModal}
                />
                <div className="profile-card-container">
                    <div className='info__heading'>Stats</div>
                    <div className='info__stats-container'>
                        <div className='info__stats__box-container'>
                            <div className='info__stats__icon-container'>
                                <img src= {rankIcon} alt='' className='info__stats__icon'/>
                            </div>
                            <div className='info__stats__number'>{userProfile.rank}</div>
                            <div className='info__stats__text'>Rank</div>
                        </div>
                        <div className='info__stats__box-container'>
                            <div className='info__stats__icon-container'>
                                <img src= {pointsIcon} alt='' className='info__stats__icon'/>
                            </div>
                            <div className='info__stats__number'>{userProfile.points}</div>
                            <div className='info__stats__text'>Points</div>
                        </div>
                        <div className='info__stats__box-container'>
                            <div className='info__stats__icon-container'>
                                <img src= {flagsIcon} alt='' className='info__stats__icon'/>
                            </div>
                            <div className='info__stats__number'>{userProfile.qAnswered.length}</div>
                            <div className='info__stats__text'>Flags</div>
                        </div>
                    </div>
                    <div className='info__heading__details'>Details</div>
                    <div className='info__details__container'>
                        <div className='info__details__heading'>Name</div>
                        <div className='info__details__text info__details__name'>
                            <div className='info__details__username' >
                                { name }
                            </div>
                            <div className="editNameBtn" onClick={() => this.openChangeModel()}>
                                <img src={editIcon} alt='' className='info__details__edit'/>
                            </div>
                        </div>
                    </div>
                    <div className='info__details__container'>
                        <div className='info__details__heading'>Email ID</div>
                        <div className='info__details__text'>{ email }</div>
                    </div>
                    <div className='info__details__container'>
                        <div className='info__details__heading'>Username</div>
                        <div className='info__details__text'>{userProfile["user name"]}</div>
                    </div>
                    <div className="button loginBtn" onClick={() => this.openLogModal()}>Log Out</div>
                </div>
            </div>
        );
    }
}

export default ProfileScreen;