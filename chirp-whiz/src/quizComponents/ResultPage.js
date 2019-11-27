import React from 'react';
import birdList from './../birdList';

function ResultPage(props) {
    return (
        <div>
            <h1>You answered {props.correct.length} out of {props.totalQs} correct</h1>
            <br />
            <h3>Birds <span style={{color: 'green'}}>correctly</span> identified &#9989;:</h3>
            {props.correct.map((birdIndex) => {return <p>{birdList[birdIndex].name}</p>})}
            <h3>Birds <span style={{color: 'red'}}>incorrectly</span> identified:</h3>
            {props.incorrect.map((birdIndex) => {return <p>{birdList[birdIndex].name}</p>})}
            <br />
        </div>
    );
}

export default ResultPage;