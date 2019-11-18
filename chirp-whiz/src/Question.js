import React, { useEffect, useState, useReducer } from 'react';
import AudioButton from './AudioButton.js';
import API, { graphqlOperation } from '@aws-amplify/api'
import { listTodos } from './graphql/queries'
import { onCreateTodo } from './graphql/subscriptions'

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
  if (props.type === 0) {
    return <h3>{props.bird.name}</h3>;
  } else if (props.type === 1) {
    return <img src={props.bird.image} alt={props.bird.name} />;
  } else {
    return <AudioButton sound={props.bird.sound} />;
  }
}


function Question() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [birds, setBirds] = useState([0]);
  const [qType, setQType] = useState(0);
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
          <button onClick={() => checkAnswer(props.answerID)}>
            <img src={props.bird.image} alt={props.bird.name} />
          </button>
        </div>
      );
    } else if (props.type === 1) {
      return (
        <div>
          <button onClick={() => checkAnswer(props.answerID)}>
            <div>{props.bird.name}</div>
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={() => checkAnswer(props.answerID)}>
            <img src={props.bird.image} alt={props.bird.name} />
            <div>{props.bird.name}</div>
          </button>
        </div>
      );
    }
  }

  function Result(props) {
    if (answerType === "correct") {
      return (
        <div>
          <h1>Correct!</h1>
          <h2>{props.bird.name}</h2>
          <img src={props.bird.image} alt={props.bird.name} />
          <AudioButton sound={props.bird.sound} />
          <button onClick={() => window.location.reload(false)}>Next Question</button>
        </div>
      );
    } else if (answerType === "incorrect") {
      return (
        <div>
          <h1>Incorrect.</h1>
          <h2>{props.bird.name}</h2>
          <img src={props.bird.image} alt={props.bird.name} />
          <AudioButton sound={props.bird.sound} />
          <button onClick={() => window.location.reload(false)}>Next Question</button>
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
    setQType(Math.floor(Math.random() * 3));
    setCorrectBird(Math.floor(Math.random() * 4));
  }

  async function getData() {
    const todoData = await API.graphql(graphqlOperation(listTodos))
    dispatch({type:'QUERY', todos: todoData.data.listTodos.items});
  }

  return(
    <div>
      {state.todos.length > 0 &&
        <div>
          <h2>Quiz</h2>
        </div>
      }
    </div>
  );
}

export default Question;
