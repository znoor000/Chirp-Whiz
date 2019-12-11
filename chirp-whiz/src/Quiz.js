import React, { useState, useEffect, useReducer } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import API, { graphqlOperation } from '@aws-amplify/api'
import { updateTodo } from './graphql/mutations';
import { listTodos } from './graphql/queries'
import { onCreateTodo } from './graphql/subscriptions'
import birdList from './birdList';
import QuizQuestion from './quizComponents/QuizQuestion';
import ResultPage from './quizComponents/ResultPage';
import AnswerPage from './quizComponents/AnswerPage';
import Leaderboard from './Leaderboard';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

Amplify.configure(awsconfig);

const initialState = {
  todos: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'QUERY':
      return {...state, todos: action.todos};
    case 'SUBSCRIPTION':
      return {...state, todos:[...state.todos, action.todo]}
    default:
      return state;
  }
};

export function chooseBirds(habs) {
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

export function createWeights(birds, correct, incorrect) {
  let weights = [];
  let total = 0;

  for (let i = 0; i < birds.length; i++) {
    let temp = 0;
    temp += incorrect[birds[i]];
    temp -= correct[birds[i]];
    total += temp;
    weights.push(temp);
  }

  let min = Math.abs(Math.min(...weights));

  for (let i = 0; i < weights.length; i++) {
    weights[i] += (min + 1);
    total += (min + 1);
  }

  let freqArr = [];

  for (let i = 0; i < weights.length; i++) {
    for (let j = 0; j < weights[i]; j++) {
      freqArr.push(birds[i]);
    }
  }

  return freqArr;
}

export function randomize(whichState, birds, oldBird, correct, incorrect) {
  if (whichState === "birds") {
    var arr = [];
    let weights = createWeights(birds, correct, incorrect);

    if (weights.length == 0)
      weights = birds;

    while(arr.length < 4) {
      var r = weights[Math.floor(Math.random() * weights.length)];
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, setUser] = useState('');
  const [questionNum, setQuestionNum] = useState(5);
  const [numCorrect, setNumCorrect] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [quizStart, setQuizStart] = useState(false);
  const [availBirds, setAvailBirds] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [birds, setBirds] = useState([0, 1, 2, 3]);
  const [correctBird, setCorrectBird] = useState(0);
  const [imageNum, setImageNum] = useState(0);
  const [correctlyAnswered, setCorrectlyAnswered] = useState({});
  const [incorrectlyAnswered, setIncorrectlyAnswered] = useState({});
  const [correctCount, setCorrectCount] = useState([]);
  const [incorrectCount, setIncorrectCount] = useState([]);
  const [questionType, setQuestionType] = useState(['image', 'audio']);
  const [answerType, setAnswerType] = useState("none_yet");
  const [chosenHabs, setChosenHabs] = useState(['Forests']);
  
  useEffect(() => {
    getUserInfo();
    
    if (state.todos.length > 0) {
      let obj = state.todos.find(obj => obj.name == user);
      setCorrectCount(obj.correct);
      setIncorrectCount(obj.incorrect);
    }
  }, [state]);

  useEffect(() => {
    async function getData() {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      dispatch({ type: 'QUERY', todos: todoData.data.listTodos.items });
    }
    getData();

    const subscription = API.graphql(graphqlOperation(onCreateTodo)).subscribe({
      next: (eventData) => {
        const todo = eventData.value.data.onCreateTodo;
        dispatch({ type: 'SUBSCRIPTION', todo });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (questionType.length == 0) {
      setQuestionType(['image', 'audio']);
    }

    let chosenHabitats = chosenHabs;
    if (chosenHabs.length == 0) {
      chosenHabitats = ['Forests'];
      setChosenHabs(chosenHabitats);
    }

    let birdsFromHabs = chooseBirds(chosenHabitats);
    let oldBird = birdList[birds[correctBird]];
    setAvailBirds(birdsFromHabs);
    let newBirds = randomize("birds", birdsFromHabs, oldBird, correctCount, incorrectCount)
    setBirds(newBirds);
    setCorrectBird(randomize("correctBird", newBirds, oldBird, correctCount, incorrectCount));
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

      let tempCount = correctCount;
      tempCount[birds[correctBird]] += 1;
      setCorrectCount(tempCount);
    } else if (answerType == "incorrect") {
      let tempIncorrect = incorrectlyAnswered;
      tempIncorrect[currentQuestion] = birds[correctBird];
      setIncorrectlyAnswered(tempIncorrect);

      let tempCount = incorrectCount;
      tempCount[birds[correctBird]] += 1;
      setIncorrectCount(tempCount);
    }
  }, [answerType]);

  useEffect(() => {
    let corrBird = birdList[birds[correctBird]];
    let birdImage = Math.floor(Math.random()*corrBird.image.length);
    setImageNum(birdImage);
  }, [correctBird])
  
  async function getUserInfo() {
    let userData = await Auth.currentAuthenticatedUser();
    setUser(userData.username);
  }

  function QuizOptions(props) {
    return (
      <div>
        <h1>Quiz</h1>
        <Container>
        <Row>
        <Col>
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
        </Col>
        <Col>
          <h2>Leaderboard</h2><br />
          <Leaderboard users={state.todos} />
        </Col>
        </Row>
        </Container>
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
      let newBirds = randomize("birds", availBirds, oldBird, correctCount, incorrectCount)
      setBirds(newBirds);
      setCorrectBird(randomize("correctBird", newBirds, oldBird, correctCount, incorrectCount));
      updateOldTodo();
    }
  }

  function renderQuestion() {
    return (
      <div>
        <QuizQuestion
          currentQuestion={currentQuestion}
          questionNum={questionNum}
          qType={questionType}
          qBird={birdList[birds[correctBird]]}
          birdImage={imageNum}
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
        <AnswerPage answerType={answerType} bird={birdList[birds[correctBird]]} birdImage={imageNum} />
        <Button
          variant="outline-light"
          size="lg"
          style={{backgroundColor: "#ffa333"}}
          onClick={() => nextQuestion()}
        >Next Question</Button>
      </div>
    );
  }

  async function updateOldTodo() {
    let obj = {id: 0};
    if(state.todos.length > 0)
      obj = state.todos.find(obj => obj.name == user);
    
    let objId = obj.id;

    const todo = {
      id: objId,
      name: user,
      correct: correctCount,
      incorrect: incorrectCount
    };
    await API.graphql(graphqlOperation(updateTodo, { input: todo }));
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