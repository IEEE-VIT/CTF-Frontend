import React from 'react';
import LoadingScreen from 'react-loading-screen';
import {firebaseAuth} from '../../configs/firebase';

import './leaderBoard.css';

// importing helper functions
import {getLeaderBoard} from '../../utils/userHelperFuncs';

class LeaderBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leaderBoard: [],
            user: null,
            isLoading: true,
        }
    }

    componentDidMount() {
        firebaseAuth.onAuthStateChanged((user) => {
            if (!user) {
                window.location.href = '/'
            }
            getLeaderBoard()
				.then((leaderBoard) => {
					this.setState({
                        leaderBoard,
						isLoading: false,
						user: user,
					})
				})
				.catch((err) => {
					alert("Unrecognized Error while fetching LeaderBoard, Please come back later!");
				})
        })
    }

    render() {
        const {leaderBoard, isLoading} = this.state;

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
            <div className="leaderboard-container">
                <div className="leaderboard-subcontainer">
                    <table cellSpacing="0px" cellPadding="0px" className="table-one">
                        <tbody>
                            <tr>
                                <td style={{
                                    width: '10%',
                                }}>Rank</td>
                                <td style={{
                                    width: '50%',
                                }}>Username</td>
                                <td style={{
                                    width: '20%',
                                }}>Points</td>
                                <td style={{
                                    width: '20%',
                                }}>Flags</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="leaderboard-card-container">
                        <table cellSpacing="0px" cellPadding="0px" className="table-one">
                            <tbody>
                                {
                                    leaderBoard.map((player, index) => {
                                        return (
                                            <tr key={player.userName}>
                                                <td style={{
                                                    width: '10%',
                                                }}>{index + 1}</td>
                                                <td style={{
                                                    width: '50%',
                                                }}>{player.userName}</td>
                                                <td style={{
                                                    width: '20%',
                                                }}>{player.points}</td>
                                                <td style={{
                                                    width: '20%',
                                                }}>{player.questionAnswered.length}</td>
                                            </tr>
                                        );
                                    })
                                }                            
                            </tbody>
                        </table>
                        <div className="divider"></div>
                        <table cellSpacing="0px" cellPadding="0px">
                        </table>
                </div>
                </div>
            </div>
        );
    }

}

export default LeaderBoard;
