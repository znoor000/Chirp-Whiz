import React, { useEffect, useState, useReducer } from 'react';
import AudioButton from './AudioButton.js';
import API, { graphqlOperation } from '@aws-amplify/api'
import { listTodos } from './graphql/queries'
import { onCreateTodo } from './graphql/subscriptions'
import {
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
  const [birdNum, setBirdNum] = useState(0);

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

  function chosenBird(index) {
    setBirdNum(index);
  }

  return(
    <div>
      {state.todos.length > 0 &&
        <div>
          <h1>Glossary</h1>
          <Switch>
            <Route path={`${match.path}/:birdName`}>
              <Bird bird={state.todos[birdNum]}/>
              <Link to={match.path}>
                <button>Return</button>
              </Link>
            </Route>
            <Route path={match.path}>
              <div>
              {state.todos.map((todo, i) =>
                <Link to={`${match.url}/${todo.name}`} key={todo.id}>
                  <button onClick={() => chosenBird(i)}>
                    <p>{todo.name}</p>
                    <img src={todo.image} alt={todo.name} />
                  </button>
                </Link>
              )}
              </div>
            </Route>
          </Switch>
        </div>
      }
    </div>
  );
}

function Bird(props) {
  let { birdName } = useParams();

  return(
    <div style={{backgroundImage: `url(${props.bird.habitatImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'}}>
      <h3>{props.bird.name}</h3>
      <img src={props.bird.image} alt={props.bird.name} />
      <AudioButton sound={props.bird.sound}/>
    </div>
  );
}

export default Glossary;