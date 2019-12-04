import React from 'react';
import birdList from './birdList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

export function winPercentage(index, correct, incorrect) {
    let percent = 0;

    if (correct[index] > 0 || incorrect[index] > 0)
        percent = (correct[index] / (correct[index] + incorrect[index]))*100;

    return percent.toFixed(2);
}

function UserPage(props) {

    return(
        <div>
            <h1>User Profile</h1><br />
            <h4>Username: {props.name}</h4>
            <h4>Email: {props.email}</h4><br /><br />
            <h2>Quiz Statistics:</h2><br />
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Bird</th>
                        <th style={{width: '300px'}}>Number of times<br /><span style={{color: 'green'}}>correctly</span> identified</th>
                        <th style={{width: '300px'}}>Number of times<br /><span style={{color: 'red'}}>incorrectly</span> identified</th>
                        <th style={{width: '300px'}}>Accuracy</th>
                    </tr>
                </thead>
                <tbody>
                    {birdList.map((bird, i) =>
                        <tr key={i}>
                            <th>{bird.name}</th>
                            <th>{props.correct[i]}</th>
                            <th>{props.incorrect[i]}</th>
                            <th>{winPercentage(i, props.correct, props.incorrect)}%</th>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default UserPage;