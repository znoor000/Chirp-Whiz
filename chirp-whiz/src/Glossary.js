import React, { useEffect,useState ,useReducer } from 'react';
import AudioButton from './AudioButton.js';
import API, { graphqlOperation } from '@aws-amplify/api'
import { listTodos } from './graphql/queries'
import { onCreateTodo } from './graphql/subscriptions'
import{
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

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

function Glossary () {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [birdNum, setBirdNum]= useState(0);

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

  let match = useRouteMatch();

  function chosenBird(index){
    setBirdNum(index);
  }

  return(
    <div>
      {state.todos.length > 0 &&
        <div>
          <h2>Glossary</h2>
          {/* Glossary code */}
        </div>
      }
    </div>
  );
}

export default Glossary;