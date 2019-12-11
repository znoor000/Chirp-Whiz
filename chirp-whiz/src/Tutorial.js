import React, { useState, useEffect } from 'react';

function Tutorial() {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <div>
      {quizStarted ? (
        <div></div>
      ) : (
        correctAnswers === 5 ? (
          <div></div>
        ) : (
          <div></div>
        )
      )}
    </div>
  )
}

export default Tutorial;