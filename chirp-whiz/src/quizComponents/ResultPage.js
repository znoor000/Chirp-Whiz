import React from 'react';

function ResultPage(props) {
    return (
        <div>
            <h1>You answered {props.correct} out of {props.totalQs} correct!</h1>
        </div>
    );
}

export default ResultPage;