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
