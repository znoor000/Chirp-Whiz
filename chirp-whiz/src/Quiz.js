import React, { useState, useEffect, useReducer } from 'react';
import Amplify, { Auth } from 'aws-amplify';    // Amplify and authorization
import awsconfig from './aws-exports';    // Important for AWS config
import API, { graphqlOperation } from '@aws-amplify/api'    // API for backend
import { updateTodo } from './graphql/mutations';   // Update database info
import { listTodos } from './graphql/queries'   // Get databse info
import { onCreateTodo } from './graphql/subscriptions'  // Subscription to database
import birdList from './birdList';    // Bird info
import QuizQuestion from './quizComponents/QuizQuestion';   // Question for quiz
import ResultPage from './quizComponents/ResultPage';   // Results at the end of quiz
import AnswerPage from './quizComponents/AnswerPage';   // Answers after each question
import Leaderboard from './Leaderboard';    // Leaderboard before quiz starts
import 'bootstrap/dist/css/bootstrap.min.css';    // Bootstrap for general styling
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';    // For quiz options
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';  // For quiz options
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/*
  The main quiz of the app. Starts with an options page that allows the user to specify
  what type of questions they want, how many questions, and which habitats they want
  the birds to be from. Also includes a leaderboard of the scores of all the users who
  took the quiz.
  Once the quiz begins it alternates between question and answer pages. The user is given
  feedback on how they performed on each question. Identifying a bird correctly makes that
  bird appear less often in the quiz, while identifying it incorrectly makes it appear
  more often. The quiz ends after the previously determined amount of questions regardless
  of how many were answered right or wrong.
  The results page gives the user feedback on which questions they got right or wrong
  and which birds were the subject of each question. The user's statistics are updated
  after the user continues on to the next question right after answering a previous
  one, so their stats are updated dynamically and stay updated even if they leave in the
  middle of a quiz.
*/

Amplify.configure(awsconfig);   // For AWS Amplify configuration

// Initialize the array used to store the database info.
const initialState = {
  todos: [],
};

// Stores the database info according to which action is performed.
// Takes in the initial state, which is the birds from the database,
// and the action to be performed.
// Returns the state altered.
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

// Chooses the birds to be seen in the quiz according to the previously
// determined habitat(s) in the quiz options.
// Argument is an array containing strings of names of the habitats chosen.
// Returns array of indices of the birds that match with the habitats.
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

// Checks whether the user answered the question correctly or not. Plays an audio
// clip depending on whether it was right or wrong (correct: bell, incorrect: buzzer).
// Arguments are choice as the user's answer choice and correctBird as the
// bird that was the correct choice for that question.
// Returns "correct" or "incorrect" accordingly.
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

// Creates weights for the randomization function depending on the correct and
// incorrect arrays for the current user. Creates a new array weights and adds
// the amount of incorrect answers for each bird in their respective locations
// according to their indicies and subtracts the correct count from the incorrect
// one. Then adds all the values in the weights array by the min value to get
// everything > 0. Finally creates a frequency array freqArr that has one entry
// for each value in the weights array according to the index.
// So if weights[2] = 4, freqArr will have 4 entries with values of 2, so maybe
// freqArr[3] thru freqArr[6] have values of 2.
// Arguments are the birds chosen for that question, and the correct and
// incorrect arrays containing the amount of questions the user got right or wrong
// and the indices correlate to that bird in the birdInfo array.
// Returns the frequency array to be used to randomize the correct birds for quiz questions.
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

// Randomizes the four birds for each quiz question and the correct bird for the questions.
// Uses the frequency array to randomize the birds according to the user's stats.
// Also makes sure that the same bird isn't given as two questions in a row. Uses
// createWeights to create the frequency array to personalize the birds that appear.
// Arguments are whichState which picks which to randomize ("birds" for quiz birds
// and "correctBird" for the correct bird for the question), birds as the bird array
// which contains the birds that can be shown for the certain quiz, oldBird as the
// bird from the previous question, and the correct and incorrect arrays.
// Returns either 4 birds that will be used in the quiz question or the bird that
// is the correct answer choice for that question.
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

// The main quiz of the app. Has customization features, new ones will be added
// so the user can customize their quizzes in more detail.
function Quiz() {
  // User data from the database
  const [state, dispatch] = useReducer(reducer, initialState);
  // The username of the current user
  const [user, setUser] = useState('');
  // The amount of questions in the quiz, default is 5
  const [questionNum, setQuestionNum] = useState(5);
  // The number of questions the user answered correctly
  const [numCorrect, setNumCorrect] = useState(0);
  // The current question that the user is on, starts at question 1
  const [currentQuestion, setCurrentQuestion] = useState(1);
  // Boolean of whether the quiz has started yet
  const [quizStart, setQuizStart] = useState(false);
  // The birds that can be used in the quiz, chosen by the "habitats"
  // choice in the quiz options
  const [availBirds, setAvailBirds] = useState([]);
  // Whether the question has been answered yet, to show the answer page
  const [answered, setAnswered] = useState(false);
  // The indices of the four birds that will appear in the current question
  const [birds, setBirds] = useState([0, 1, 2, 3]);
  // The index of the correct answer choice
  const [correctBird, setCorrectBird] = useState(0);
  // The index of the bird's image that will appear in the question
  const [imageNum, setImageNum] = useState(0);
  // The birds the user correctly answered, question number and name
  const [correctlyAnswered, setCorrectlyAnswered] = useState({});
  // The birds the user incorrectly answered, question number and name
  const [incorrectlyAnswered, setIncorrectlyAnswered] = useState({});
  // The array of counts of how many times the user correctly identified which bird
  const [correctCount, setCorrectCount] = useState([]);
  // The array of counts of how many times the user incorrectly identified which bird
  const [incorrectCount, setIncorrectCount] = useState([]);
  // Which forms of media appear in each question
  const [questionType, setQuestionType] = useState(['image', 'audio']);
  // Whether the question was answered correctly or incorrectly
  const [answerType, setAnswerType] = useState("none_yet");
  // Which habitats the user wishes to see represented in the quiz
  const [chosenHabs, setChosenHabs] = useState(['Forests']);
  
  // Store user info from database into state
  useEffect(() => {
    getUserInfo();
    
    if (state.todos.length > 0) {
      let obj = state.todos.find(obj => obj.name == user);
      setCorrectCount(obj.correct);
      setIncorrectCount(obj.incorrect);
    }
  }, [state]);

  // API functions query data from database and subscribe to it so the app
  // automatically updates with new/updated entries
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

  // Sets up quiz state variables when quiz begins. Sets the question type and
  // chosen habitats according to the given quiz options, birds that can be chosen
  // for the quiz according to the chosen habitats, the correct bird for the first
  // question, and making sure that the next page is the question page. Sets defaults
  // if no quiz options are chosen such as image and audio questions and the forest habitat.
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

  // Updates state once a question is answered. Enters the answer page and updates
  // state according to whether the question was answered right or wrong. Increments
  // the (in)correct array on the index corresponding to the correct bird, adds the
  // answered bird and its question number to an array that will display that info on
  // the results page, and increments the amount of questions answered correctly.
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

  // Randomizes the image that will be displayed for the bird being questioned
  // to improve variety. This way the user will be quizzed on the bird itself
  // rather than a specific image.
  useEffect(() => {
    let corrBird = birdList[birds[correctBird]];
    let birdImage = Math.floor(Math.random()*corrBird.image.length);
    setImageNum(birdImage);
  }, [correctBird])
  
  // Gets the user's info from the authentication feature.
  // Stores the current user's username.
  async function getUserInfo() {
    let userData = await Auth.currentAuthenticatedUser();
    setUser(userData.username);
  }

  // The quiz options that are displayed before the quiz begins. Lets the user
  // choose whether they want images, audio, or both, how many questions on the quiz
  // between 5, 10, and 20, and which habitats they want birds to appear from in
  // the quiz. Also displays the leaderboard.
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
        <h2>Include birds of which habitats?</h2>
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

  // The answer buttons that appear in the quiz. Checks whether the answer is correct
  // on click. Props are the ID of the button clicked, the index of the correct bird,
  // and the of the bird that the answer button corresponds to.
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

  // Changes state when the users wishes to continue on to the next question from
  // the answer page of the previous question. Ends the quiz if the user answered the
  // last question of the quiz. Increments the current question tally, re-randomizes
  // the birds to appear in the next question and the next correct bird choice, updates
  // the correct and incorrect arrays in the database, and resets other values so that the
  // current state matches that of being in a question in the quiz.
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

  // Renders the quiz page. Outputs the quiz questions at the top and the four answer
  // buttons underneath.
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

  // Renders the answer page after each question is answered. Outputs the answer page
  // with the correct bird from the question and also a button to continue in the quiz.
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

  // Updates the user's correct and incorrect count arrays in the database.
  // Starts with an initial value if the API hasn't loaded yet, then creates a new
  // user object containing the new info and updates the user's data in the database
  // to be the new object.
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

  // The quiz renders the options page at the intital render. This then leads into
  // a question that when answered (an answer button is clicked) leads to an answer
  // page. This answer page has a button that then continues the quiz. Once the quiz
  // has finished the final results page is rendered with the stats from the just
  // finished quiz. Also includes the two audio files that are played when on the answer
  // page when a question is answered either right or wrong.
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