import React from 'react';
import Image from 'react-bootstrap/Image';  // Bootstrap for general styling
import AudioButton from './AudioButton';    // For bird audio
import ProgressBar from 'react-bootstrap/ProgressBar';      // Progress bar during quiz

/*
    The question pages rendered during the quiz. Renders the bird's image and/or audio
    depending on the quiz options specified in the main quiz component before the quiz
    begins. Shows the user's progress through the quiz with the current and total question
    numbers along with a progress bar.
*/

// Renders the bird's image and/or audio for the current question.
// Props are qType for whether the question includes image, audio, or both,
// bird for the current bird and its images and sound, and imageNum for the
// current image to be displayed. This value is randomized so that a different
// image for the same bird is shown on the quiz for each question.
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

// Renders the full question along with the progress through the quiz and the question info.
// Props are the current and total question numbers along with the correct bird's info in qBird,
// the question type in qType, and the randomized image number in birdImage.
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