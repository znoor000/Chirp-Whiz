import React from 'react';
import AudioButton from './AudioButton';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';

function AnswerPage(props) {
    return (
        <div>
            {props.answerType == "correct" ? (
                <h2>Correct!</h2>
            ) : (
                <h2>Incorrect...</h2>
            )}
            <Card>
            <Card.Header as="h2">{props.bird.name}</Card.Header>
            <Card.Body>
                
            </Card.Body>
            </Card>
        </div>
    );
}

export default AnswerPage;
