import React from 'react';
import birdList from './../birdList';   // Bird info

/*
    This is the page that renders at the end of the quiz. It lets the user know how many
    questions they got correct and which questions in the quiz that they were.
    Props are the arrays of correct and incorrect questions for that quiz along with
    the total questions in the quiz.
*/

function ResultPage(props) {
    return (
        <div>
            <h1>You answered {Object.keys(props.correct).length} out of {props.totalQs} correct</h1>
            <br />
            <h3>Birds <span style={{color: 'green'}}>correctly</span> identified &#9989;:</h3>
            {Object.keys(props.correct).map(key => <p>{key}. {birdList[props.correct[key]].name}</p>)}
            <h3>Birds <span style={{color: 'red'}}>incorrectly</span> identified:</h3>
            {Object.keys(props.incorrect).map(key => <p>{key}. {birdList[props.incorrect[key]].name}</p>)}
            <br />
        </div>
    );
}

export default ResultPage;