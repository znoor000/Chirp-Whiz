import React from 'react';
import birdList from './birdList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function winPercentage(index, correct, incorrect) {
    let percent = 0;

    if (correct[index] > 0 || incorrect[index] > 0)
        percent = (correct[index] / (correct[index] + incorrect[index]))*100;

    return percent.toFixed(2);
}

export function totalPercent(corrTotal, incorrTotal) {
    let percent = 0;

    if (corrTotal > 0 || incorrTotal > 0) {
        percent = (corrTotal/(corrTotal+incorrTotal))*100;
    }

    return percent.toFixed(2);
}

function UserPage(props) {
    const answeredCorrect = props.correct.reduce((a, b) => a + b, 0);
    const answeredInCorrect = props.incorrect.reduce((a, b) => a + b, 0);
    
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