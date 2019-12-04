import React from 'react';
import Image from 'react-bootstrap/Image';
import AudioButton from './AudioButton';
import ProgressBar from 'react-bootstrap/ProgressBar';

export function QuestionInfo(props) {
    return(
        <div>
            {props.qType.includes('image') &&
                <Image src={props.bird.image[props.imageNum]} thumbnail style={{height: '300px'}}/>
            }
            {props.qType.includes('audio') &&
                <AudioButton sound={props.bird.sound} />
            }
        </div>
    );
}

function QuizQuestion(props) {
    return (
        <div>
            <h4>Question number {props.currentQuestion} of {props.questionNum}</h4>
            <ProgressBar now={(props.currentQuestion / props.questionNum) * 100} />
            <h4>Identify this bird:</h4>
            <QuestionInfo bird={props.qBird} qType={props.qType} imageNum={props.birdImage} />
        </div>
    );
}

export default QuizQuestion;