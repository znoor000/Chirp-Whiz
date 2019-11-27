import React, { useState, useEffect } from 'react';
import birdList from './birdList';
import QuizQuestion from './quizComponents/QuizQuestion';
import ResultPage from './quizComponents/ResultPage';
import AnswerPage from './quizComponents/AnswerPage';
import AudioButton from './quizComponents/AudioButton';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function chooseBirds(habs) {
  let birds = [];

  for (let i = 0; i < birdList.length; i++) {
    let isFromHab = false;

    for (let j = 0; j < habs.length; j++) {
      if (birdList[i].habitat.includes(habs[j]))
        isFromHab = true;
    }

    if (isFromHab) birds.push(i);
  }

  return birds;
}

export function checkAnswer(choice, correctBird) {
  var aType = "";
  if (choice === correctBird) {
    aType = "correct";
    let x = document.getElementById("ding");
    x.volume = 0.2;
    x.play();
  } else {
    aType = "incorrect";
    let x = document.getElementById("buzz");
    x.volume = 0.1;
    x.play();
  }

  return aType;
}

export function randomize(whichState, birds, oldBird) {
  if (whichState === "birds") {
    var arr = [];
    while(arr.length < 4) {
      var r = birds[Math.floor(Math.random() * birds.length)];
      if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  } else {
    let newCorrectBird = 0;
    do {
      newCorrectBird = Math.floor(Math.random() * 4);
    } while (birdList[birds[newCorrectBird]] === oldBird);
    return newCorrectBird;
  }
}

function Quiz() {
  const [questionNum, setQuestionNum] = useState(5);
  const [numCorrect, setNumCorrect] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [quizStart, setQuizStart] = useState(false);
  const [availBirds, setAvailBirds] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [birds, setBirds] = useState([0, 1, 2, 3]);
  const [correctBird, setCorrectBird] = useState(0);
  const [correctlyAnswered, setCorrectlyAnswered] = useState({});
  const [incorrectlyAnswered, setIncorrectlyAnswered] = useState({});
  const [questionType, setQuestionType] = useState(['image', 'audio']);
  const [answerType, setAnswerType] = useState("none_yet");
  const [chosenHabs, setChosenHabs] = useState(['Forests', 'Open Woodlands', 'Grasslands', 'Lakes and Ponds']);

  useEffect(() => {
    let birdsFromHabs = chooseBirds(chosenHabs);
    let oldBird = birdList[birds[correctBird]];
    setAvailBirds(birdsFromHabs);
    setBirds(randomize("birds", birdsFromHabs));
    setCorrectBird(randomize("correctBird", correctBird, oldBird));
    setAnswerType('none_yet');
  }, [quizStart]);

  useEffect(() => {
    if (quizStart && answerType != "none_yet") {
      setAnswered(true);
    }
    
    if (answerType == "correct") {
      setNumCorrect(numCorrect + 1);

      let tempCorrect = correctlyAnswered;
      tempCorrect[currentQuestion] = birds[correctBird];
      setCorrectlyAnswered(tempCorrect);
    } else if (answerType == "incorrect") {
      let tempIncorrect = incorrectlyAnswered;
      tempIncorrect[currentQuestion] = birds[correctBird];
      setIncorrectlyAnswered(tempIncorrect);
    }
  }, [answerType]);

  function QuizOptions(props) {
    return (
      <div>
        <h1>Quiz</h1>
        <div style={{padding: '20px'}}>
        <h2>What type(s) of questions?</h2>
        <ToggleButtonGroup type="checkbox" value={questionType} onChange={val => setQuestionType(val)}>
          <ToggleButton variant="outline-warning" value={'image'}>Image</ToggleButton>
          <ToggleButton variant="outline-warning" value={'audio'}>Audio</ToggleButton>
        </ToggleButtonGroup>
        </div>
        <h2>How many questions?</h2>
        <ToggleButtonGroup name="num" value={questionNum} onChange={val => setQuestionNum(val)}>
          <ToggleButton variant="outline-warning" value={5}>5</ToggleButton>
          <ToggleButton variant="outline-warning" value={10}>10</ToggleButton>
          <ToggleButton variant="outline-warning" value={20}>20</ToggleButton>
        </ToggleButtonGroup>
        <div style={{padding: '20px'}}>
        <h2>Which habitats?</h2>
        <ToggleButtonGroup type="checkbox" value={chosenHabs} onChange={val => setChosenHabs(val)}>
          <ToggleButton variant="outline-warning" value={'Forests'}>Forests</ToggleButton>
          <ToggleButton variant="outline-warning" value={'Open Woodlands'}>Open Woodlands</ToggleButton>
          <ToggleButton variant="outline-warning" value={'Grasslands'}>Grasslands</ToggleButton>
          <ToggleButton variant="outline-warning" value={'Lakes and Ponds'}>Lakes and Ponds</ToggleButton>
        </ToggleButtonGroup>
        </div>
        <div style={{padding: '30px'}}>
        <Button
          variant="outline-light"
          size="lg"
          style={{backgroundColor: "#ffa333"}}
          onClick={() => setQuizStart(true)}
        >Start Quiz Now</Button>
        </div>
      </div>
    );
  }

  function AnswerButton(props) {
    return (
      <Button 
        variant="outline-light"
        size="lg"
        style={{backgroundColor: "#ffa333"}}
        block
        onClick={() => setAnswerType(checkAnswer(props.answerID, props.correctBird))}>
        <div>{props.bird.name}</div>
      </Button>
    )
  }

  function nextQuestion() {
    if (currentQuestion === questionNum) {
      setQuizStart(!quizStart);
    } else {
      let oldBird = birdList[birds[correctBird]];
      setAnswerType('none_yet');
      setAnswered(false);
      setCurrentQuestion(currentQuestion + 1);
      let newBirds = randomize("birds", availBirds)
      setBirds(newBirds);
      setCorrectBird(randomize("correctBird", newBirds, oldBird));
    }
  }

  function renderQuestion() {
    return (
      <div>
        {/*<h4>Question number {currentQuestion} of {questionNum}</h4>
        <ProgressBar now={(currentQuestion / questionNum) * 100} />
        <h4>Identify this bird:</h4>
        <QuestionInfo bird={birdList[birds[correctBird]]} />*/}
        <QuizQuestion
          currentQuestion={currentQuestion}
          questionNum={questionNum}
          qType={questionType}
          qBird={birdList[birds[correctBird]]}
        />
        <Container>
          <Row>
            <Col>
            <AnswerButton bird={birdList[birds[0]]} answerID={0} correctBird={correctBird} />
            </Col>
            <Col>
            <AnswerButton bird={birdList[birds[1]]} answerID={1} correctBird={correctBird} />
            </Col>
            <Col>
            <AnswerButton bird={birdList[birds[2]]} answerID={2} correctBird={correctBird} />
            </Col>
            <Col>
            <AnswerButton bird={birdList[birds[3]]} answerID={3} correctBird={correctBird} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  function renderResult() {
    return (
      <div>
        <AnswerPage answerType={answerType} bird={birdList[birds[correctBird]]} />
        <Button
          variant="outline-light"
          size="lg"
          style={{backgroundColor: "#ffa333"}}
          onClick={() => nextQuestion()}
        >Next Question</Button>
      </div>
    );
  }

  return (
    <div>
      {quizStart ? (
        answered ? (
          renderResult()
        ) : (
          renderQuestion()
        )
      ) : (
        currentQuestion === questionNum ? (
          <ResultPage
            totalQs={questionNum}
            correct={correctlyAnswered}
            incorrect={incorrectlyAnswered}
          />
        ) : (
          <QuizOptions />
        )
      )}
      {(quizStart || currentQuestion === questionNum) && 
      <Button variant="secondary" onClick={() => setTimeout(() => window.location.reload(false), 200)}>Return</Button>
      }
      <audio id="buzz">
        <source src="https://www.myinstants.com/media/sounds/wrong-answer-sound-effect.mp3" type="audio/mpeg"></source>
      </audio>
      <audio id="ding">
        <source src="https://www.myinstants.com/media/sounds/correct.swf.mp3" type="audio/mpeg"></source>
      </audio>
    </div>
  );
}

export default Quiz;