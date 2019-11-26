import React from 'react';
import AudioButton from './AudioButton';
import Image from 'react-bootstrap/Image';

function AnswerPage(props) {
    return (
        <div>
            {props.answerType == "correct" ? (
                <h2>Correct!</h2>
            ) : (
                <h2>Incorrect...</h2>
            )}

        </div>
    );
}

export default AnswerPage;
