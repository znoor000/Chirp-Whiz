import React, { useEffect, useState, useReducer } from 'react';
import AudioButton from './quizComponents/AudioButton';
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import { listTodos } from './graphql/queries'
import { onCreateTodo } from './graphql/subscriptions'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import awsconfig from './aws-exports';
import birdList from './birdList';

API.configure(awsconfig);
PubSub.configure(awsconfig);

{/*const initialState = {todos:[]};
export const reducer = (state, action) =>{
  switch(action.type){
    case 'QUERY':
      return {...state, todos:action.todos}
    case 'SUBSCRIPTION':
      return {...state, todos:[...state.todos, action.todo]}
    default:
      return state
  }
}*/}

export function QuestionInfo(props) {
  {/*if (props.type === 0) {
    return <h3>{props.bird.name}</h3>;
  } else if (props.type === 1) {
    return <img src={props.bird.image} alt={props.bird.name} />;
  } else {
    return <AudioButton sound={props.bird.sound} />;
  }*/}

  return(
    <div>
      <Image src={props.bird.image} thumbnail style={{height: '300px'}}/>
      <AudioButton sound={props.bird.sound} />
    </div>
  );
}

export function Result(props) {
  if (props.isCorrect === "correct") {
    return (
      <div>
        {/*<h1>Correct!</h1>
        <h2>{props.bird.name}</h2>
        <img src={props.bird.image} alt={props.bird.name} />
    <AudioButton sound={props.bird.sound} />*/}
        <Button variant="success" onClick={() => window.location.reload(false)}>Correct! Next Question</Button>
      </div>
    );
  } else if (props.isCorrect === "incorrect") {
    return (
      <div>
        {/*<h1>Incorrect.</h1>
        <h2>{props.bird.name}</h2>
        <img src={props.bird.image} alt={props.bird.name} />
    <AudioButton sound={props.bird.sound} />*/}
        <Button variant="danger" onClick={() => window.location.reload(false)}>Incorrect... Next Question</Button>
      </div>
    )
  } else {
    return <div>Hmm...</div>
  }
}

export function checkAnswer(choice, correctBird, resultRef) {
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

  resultRef.current.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });

  return aType;
}

export function randomize(whichState, length) {
  if (whichState === "birds") {
    var arr = [];
    while(arr.length < 4) {
      var r = Math.floor(Math.random() * length);
      if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  } else {

  {/*setQType(Math.floor(Math.random() * 3));*/}
    return(Math.floor(Math.random() * 4));
  }
}

function Question() {
  {/*const [state, dispatch] = useReducer(reducer, initialState);*/}
  const [state, setState] = useState({
    todos: birdList
  });
  const [birds, setBirds] = useState([0]);
  const [qType, setQType] = useState(1);
  const [correctBird, setCorrectBird] = useState(0);
  const [answerType, setAnswerType] = useState("none_yet");

  {/*useEffect(() => {
    getData()
    const subscription = API.graphql(graphqlOperation(onCreateTodo)).subscribe({
      next: (eventData) => {
        const todo = eventData.value.data.onCreateTodo;
        dispatch({type:'SUBSCRIPTION', todo})
      }
    })
  return () => subscription.unsubscribe()
  }, [])*/}

  useEffect(() => {
    if (state.todos.length !== 0) {
      setBirds(randomize("birds", state.todos.length));
      setCorrectBird(randomize("correctBird"));
    }
  }, [state.todos.length]);

  function AnswerButton(props) {
    if(props.type === 0) {
      return (
        <div>
          <Button
            variant="primary"
            size="lg"
            block
            onClick={() => setAnswerType(checkAnswer(props.answerID, props.correctBird, resultRef))}>
            <img src={props.bird.image} alt={props.bird.name} />
          </Button>
        </div>
      );
    } else if (props.type === 1) {
      return (
        <div>
          <Button 
            variant="outline-light"
            size="lg"
            style={{backgroundColor: "#ffa333"}}
            block
            onClick={() => setAnswerType(checkAnswer(props.answerID, props.correctBird, resultRef))}>
            <div>{props.bird.name}</div>
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button
            variant="primary"
            size="lg"
            block
            onClick={() => setAnswerType(checkAnswer(props.answerID, props.correctBird, resultRef))}>
            <img src={props.bird.image} alt={props.bird.name} />
            <div>{props.bird.name}</div>
          </Button>
        </div>
      );
    }
  }

  {/*async function getData() {
    const todoData = await API.graphql(graphqlOperation(listTodos))
    dispatch({type:'QUERY', todos: todoData.data.listTodos.items});
  }*/}

  const resultRef = React.createRef();

  return(
    <div>
      {state.todos.length > 0 && birds.length > 1 &&
        <div>
          {/** style={{backgroundImage: `url(${state.todos[birds[correctBird]].habitatImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'}} */}
          {/*<h4>Question type:</h4>
          <button onClick={() => setQType(0)}>Name</button>
          <button onClick={() => setQType(1)}>Image</button>
          <button onClick={() => setQType(2)}>Audio</button>
          <button onClick={() => setQType(Math.floor(Math.random() * 3))}>Random</button>
          <h2>Question:</h2>*/}
          <h2>Identify this bird:</h2>
          <QuestionInfo type={qType} bird={state.todos[birds[correctBird]]} />
          <Container>
            <Row>
              <Col>
              <AnswerButton type={qType} bird={state.todos[birds[0]]} answerID={0} correctBird={correctBird} />
              </Col>
              <Col>
              <AnswerButton type={qType} bird={state.todos[birds[1]]} answerID={1} correctBird={correctBird} />
              </Col>
              <Col>
              <AnswerButton type={qType} bird={state.todos[birds[2]]} answerID={2} correctBird={correctBird} />
              </Col>
              <Col>
              <AnswerButton type={qType} bird={state.todos[birds[3]]} answerID={3} correctBird={correctBird} />
              </Col>
            </Row>
          </Container>
          <div ref={resultRef}><br />
            <Result isCorrect={answerType} /*bird={state.todos[birds[correctBird]]}*/ />
            <audio id="buzz">
              <source src="https://www.myinstants.com/media/sounds/wrong-answer-sound-effect.mp3" type="audio/mpeg"></source>
            </audio>
            <audio id="ding">
              <source src="https://www.myinstants.com/media/sounds/correct.swf.mp3" type="audio/mpeg"></source>
            </audio>
          </div>
        </div>
      }
    </div>
  );
}

export default Question;