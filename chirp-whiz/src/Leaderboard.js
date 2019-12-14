import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap for general styling
import Table from 'react-bootstrap/Table';      // Used to display the leaderboard.

/*
    The leaderboard displays the accuracy scores for all of the current users and
    ranks them from highest to lowest accuracy. It takes in all of the correct and
    incorrect answers for each user and calculates the accuracy scores for each user,
    sorts them, then outputs them in a table.
*/

// Calculates a user's acurracy score from their correct and incorrect arrays.
// Takes in a user object and performs calculations on the aforementioned arrays.
export function totalPercent(user) {
    let percent = 0;
    let corrTotal = user.correct.reduce((a, b) => a + b, 0);
    let incorrTotal = user.incorrect.reduce((a, b) => a + b, 0);

    if (corrTotal > 0 || incorrTotal > 0) {
        percent = (corrTotal/(corrTotal+incorrTotal))*100;
    }

    return percent.toFixed(2);
}

// Creates a new array of users that includes their names and their accuracy scores.
// Argument is the array of user object.
// Returns a new array with objects including the users names and their new scores.
export function scorify(users) {
    let newUserArray = [];
    for (let i = 0; i < users.length; i++) {
        newUserArray.push({
            name: users[i].name,
            score: totalPercent(users[i])
        })
    }
    return newUserArray;
}

// Renders the leaderboard. The prop is an array containing all of the users
// registered for the app. This is so that the leaderboard can rank all of the users.
function Leaderboard(props) {
    // The new array with accuracy scores.
    const [lboardUsers, setLboardUsers] = useState([{
        name: 'name',
        score: 0.00
    }]);

    // On intital render: creates accuracy scores for the users, sorts them from highest
    // to lowest scores, and updates state with the new array of users.
    useEffect(() => {
        let usersWithScores = scorify(props.users);
        usersWithScores.sort(function(a, b){return b.score - a.score});
        setLboardUsers(usersWithScores);
    }, [])

    // Renders the current array of users in a table. Should be scorified and sorted.
    return (
        <div>
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Accuracy</th>
                </tr>
            </thead>
            <tbody>
                {lboardUsers.map((currentUser, i) =>
                    <tr key={i}>
                        <th>{currentUser.name}</th>
                        <th>{currentUser.score}%</th>
                    </tr>
                )}
            </tbody>
            </Table>
        </div>
    );
}

export default Leaderboard;