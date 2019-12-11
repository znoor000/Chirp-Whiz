import React, { useState, useEffect } from 'react';
import birdList from './birdList';

export function randomize(type, oldBird) {
  if (type == "learn") {
      var arr = [];
      while(arr.length < 4){
          var r = Math.floor(Math.random() * birdList.length);
          if(arr.indexOf(r) === -1) arr.push(r);
      }
      return arr;
  } else {
      let newCorrectBird = 0;
      do {
          newCorrectBird = Math.floor(Math.random() * 4);
      } while (newCorrectBird === oldBird);
      return newCorrectBird;
  }
}

function Tutorial() {
  const [learningBirds, setLearningBirds] = useState([0, 1, 2, 3]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [correctBird, setCorrectBird] = useState(0);

  useEffect(() => {
    let oldBird = correctBird;
    setLearningBirds(randomize("learn"));
    setCorrectBird(randomize("correct", oldBird));
}, []);

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