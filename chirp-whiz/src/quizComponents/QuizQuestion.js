import React from 'react';
import Image from 'react-bootstrap/Image';
import AudioButton from './AudioButton';
import ProgressBar from 'react-bootstrap/ProgressBar';

export function QuestionInfo(props) {
    return(
        <div>
            <Image src={props.bird.image} thumbnail style={{height: '300px'}}/>
            <AudioButton sound={props.bird.sound} />
        </div>
    );
}

function QuizQuestion(props) {
    return (
        <div>
            <h4>Question number {props.currentQuestion} of {props.questionNum}</h4>
            <ProgressBar now={(props.currentQuestion / props.questionNum) * 100} />
            <h4>Identify this bird:</h4>
            <QuestionInfo bird={props.qBird} />
        </div>
    );
}
