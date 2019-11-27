import React from 'react';
import birdList from './../birdList';

function ResultPage(props) {
    return (
        <div>
            <h1>You answered {props.correct.length} out of {props.totalQs} correct</h1>
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