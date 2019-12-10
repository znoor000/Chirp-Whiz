import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

export function totalPercent(user) {
    let percent = 0;
    let corrTotal = user.correct.reduce((a, b) => a + b, 0);
    let incorrTotal = user.incorrect.reduce((a, b) => a + b, 0);

    if (corrTotal > 0 || incorrTotal > 0) {
        percent = (corrTotal/(corrTotal+incorrTotal))*100;
    }

    return percent.toFixed(2);
}

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

function Leaderboard(props) {
    const [lboardUsers, setLboardUsers] = useState([{
        name: 'name',
        score: 0.00
    }]);

    useEffect(() => {
        let usersWithScores = scorify(props.users);
        usersWithScores.sort(function(a, b){return b.score - a.score});
        setLboardUsers(usersWithScores);
    }, [])

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