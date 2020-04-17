import React from 'react';
import * as firebase from 'firebase';

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
        firebase.auth().onAuthStateChanged((user) => {
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
        const {leaderBoard} = this.state;
        console.log(leaderBoard);
        return (
            <div className="leaderboard-container">
                <div className="leaderboard-subcontainer">
                    <table cellSpacing="0px" cellPadding="0px" className="table-one">
                        <thead>
                            <th>Rank</th>
                            <th>Username</th>
                            <th className="empty-td">  </th>
                            <th>Points</th>
                            <th>Flags</th>
                        </thead>
                    </table>
                    <div className="leaderboard-card-container">
                    <table cellSpacing="0px" cellPadding="0px" className="table-one">
                        <tbody>
                            {
                                leaderBoard.map((player, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{player.name}</td>
                                            <td className="empty-td"> </td>
                                            <td>{player.points}</td>
                                            <td>2</td>
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