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
