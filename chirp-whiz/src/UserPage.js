import React from 'react';
import birdList from './birdList';      // Bird info
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap for general styling
import Table from 'react-bootstrap/Table';      // For the leaderboard
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/*
    The user profile page lists info related to the user such as their quiz stats
    and user info such asa username and email. The statistics are intended to give
    the user feedback on how well they are performing in their quizzes.
    Info listed includes he amount of questions they got correct and incorrect along with
    their total and bird-specific accuracy scores.
    The props are the user's name, email, and the array of the correct and incorrect values.
    These arrays are then used to calculate the percentages seen on the page and in the table.
*/

// Calculates the accuracy score for each bird.
// Returns the accuracy as a percentage out of 100.
export function winPercentage(index, correct, incorrect) {
    let percent = 0;

    if (correct[index] > 0 || incorrect[index] > 0)
        percent = (correct[index] / (correct[index] + incorrect[index]))*100;

    return percent.toFixed(2);
}

// Calculates the accuracy score for every bird overall.
// Returns the accuracy as a percentage out of 100.
export function totalPercent(corrTotal, incorrTotal) {
    let percent = 0;

    if (corrTotal > 0 || incorrTotal > 0) {
        percent = (corrTotal/(corrTotal+incorrTotal))*100;
    }

    return percent.toFixed(2);
}

function UserPage(props) {
    // Summations of the amount of questions answered correctly and incorrectly.
    const answeredCorrect = props.correct.reduce((a, b) => a + b, 0);
    const answeredInCorrect = props.incorrect.reduce((a, b) => a + b, 0);
    
    // Placeholder email for the test user.
    let email = props.email;
    if (props.name == 'test') {
        email = 'placeholder email';
    }

    return(
        <div>
            <h1>User Profile</h1><br />
            <Row>
            <Col>
            <h2>Username:</h2>
            <h5>{props.name}</h5>< br/>
            <h2>Email:</h2>
            <h5>{email}</h5>
            </Col>
            <Col>
            <h4>Total questions answered <span style={{color: 'green'}}>correctly</span>:</h4>
            <h5>{answeredCorrect}</h5>
            <h4>Total questions answered <span style={{color: 'red'}}>incorrectly</span>:</h4>
            <h5>{answeredInCorrect}</h5>
            <h4>Total questions answered:</h4>
            <h5>{answeredCorrect + answeredInCorrect}</h5>
            <h4>Total accuracy score:</h4>
            <h5>{totalPercent(answeredCorrect, answeredInCorrect)}%</h5>
            </Col>
            </Row>
            <br />
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