import React from 'react';
import AudioButton from './AudioButton';    // For bird audio
import Image from 'react-bootstrap/Image';      // Bottstrap for general styling
import Card from 'react-bootstrap/Card';

/*
    The page that appears when the user answers a question in the quiz. Lets the user
    know whether they got the answer right or wrong and displays the info of the
    correct bird so that the user can learn from their mistake or reaffirm their knowledge.
    Or if the user is curious about the bird and wishes to study it some more.
*/

// Render the answer page. Props are answerType for whether the question was answered
// correctly on incorrectly, bird as the object containing all of the bird info such as
// name, image array, and sound, and birdImage as the index of the image used in the
// question so that the answer page matches with the question page.
function AnswerPage(props) {
    return (
        <div>
            {props.answerType == "correct" ? (
                <h2 style={{color: 'green'}}><strong>Correct!</strong></h2>
            ) : (
                <h2 style={{color: 'red'}}><strong>Incorrect...</strong></h2>
            )}
            <Card>
                <Card.Header as="h2">
                    {props.bird.name}
                </Card.Header>
                <Card.Body>
                <Image src={props.bird.image[props.birdImage]} rounded style={{height: '200px'}} />
                    <AudioButton sound={props.bird.sound} />
                </Card.Body>
            </Card>
        </div>
    );
}

export default AnswerPage;
