import React, { useEffect, useState, useReducer } from 'react';
import AudioButton from './AudioButton.js';
import API, { graphqlOperation } from '@aws-amplify/api'
import { listTodos } from './graphql/queries'
import { onCreateTodo } from './graphql/subscriptions'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

const initialState = {todos:[]};
const reducer = (state, action) =>{
  switch(action.type){
    case 'QUERY':
      return {...state, todos:action.todos}
    case 'SUBSCRIPTION':
      return {...state, todos:[...state.todos, action.todo]}
    default:
      return state
  }
}

function QuestionInfo(props) {
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

function Question() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [birds, setBirds] = useState([0]);
  const [qType, setQType] = useState(1);
  const [correctBird, setCorrectBird] = useState(0);
  const [answerType, setAnswerType] = useState("none_yet");

  useEffect(() => {
    getData()
    const subscription = API.graphql(graphqlOperation(onCreateTodo)).subscribe({
      next: (eventData) => {
        const todo = eventData.value.data.onCreateTodo;
        dispatch({type:'SUBSCRIPTION', todo})
      }
    })
  return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (state.todos.length !== 0) randomize();
  }, [state.todos.length]);

  function AnswerButton(props) {
    if(props.type === 0) {
      return (
        <div>
          <Button variant="primary" size="lg" block onClick={() => checkAnswer(props.answerID)}>
            <img src={props.bird.image} alt={props.bird.name} />
          </Button>
        </div>
      );
    } else if (props.type === 1) {
      return (
        <div>
          <Button variant="outline-light" size="lg" style={{backgroundColor: "#ffa333"}} block onClick={() => checkAnswer(props.answerID)}>
            <div>{props.bird.name}</div>
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button variant="primary" size="lg" block onClick={() => checkAnswer(props.answerID)}>
            <img src={props.bird.image} alt={props.bird.name} />
            <div>{props.bird.name}</div>
          </Button>
        </div>
      );
    }
  }

  function Result(props) {
    if (answerType === "correct") {
      return (
        <div>
          {/*<h1>Correct!</h1>
          <h2>{props.bird.name}</h2>
          <img src={props.bird.image} alt={props.bird.name} />
      <AudioButton sound={props.bird.sound} />*/}
          <Button variant="success" onClick={() => window.location.reload(false)}>Correct! Next Question</Button>
        </div>
      );
    } else if (answerType === "incorrect") {
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

  function randomize() {
    var arr = [];
    while(arr.length < 4) {
      var r = Math.floor(Math.random() * state.todos.length);
      if(arr.indexOf(r) === -1) arr.push(r);
    }
    setBirds(arr);
    {/*setQType(Math.floor(Math.random() * 3));*/}
    setCorrectBird(Math.floor(Math.random() * 4));
  }

  async function getData() {
    const todoData = await API.graphql(graphqlOperation(listTodos))
    dispatch({type:'QUERY', todos: todoData.data.listTodos.items});
  }

  const resultRef = React.createRef();

  function checkAnswer(choice) {
    if (choice === correctBird) {
      setAnswerType("correct");
      let x = document.getElementById("ding");
      x.volume = 0.2;
      x.play();
    } else {
      setAnswerType("incorrect");
      let x = document.getElementById("buzz");
      x.volume = 0.2;
      x.play();
    }

    resultRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

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
              <AnswerButton type={qType} bird={state.todos[birds[0]]} answerID={0} />
              </Col>
              <Col>
              <AnswerButton type={qType} bird={state.todos[birds[1]]} answerID={1} />
              </Col>
              <Col>
              <AnswerButton type={qType} bird={state.todos[birds[2]]} answerID={2} />
              </Col>
              <Col>
              <AnswerButton type={qType} bird={state.todos[birds[3]]} answerID={3} />
              </Col>
            </Row>
          </Container>
          <div ref={resultRef}><br />
            <Result bird={state.todos[birds[correctBird]]}/>
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

{/*module.exports = QuestionInfo;*/}