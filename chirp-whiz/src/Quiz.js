import React, { Component, useEffect, useReducer } from 'react';
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

class AudioButton extends Component {
  playAudio() { 
    let x = document.getElementById("bird");
    x.play();
  }

  render() {
    return (
      <div>
        <audio id="bird">
          <source src={this.props.sound} type="audio/mpeg"></source>
        </audio>

        <button onClick={this.playAudio}>
          <div>Bird Call/Sound</div>
        </button>
      </div>
    );
  }
}

function ImageButton(props) {
    return (
      <div>
        <button>
          <img src={props.image} onClick={console.log(props.name)} alt="Desired bird" />
          <div>{props.name}</div>
        </button>
      </div>
    );
}

function Quiz() {
  const [state, dispatch] = useReducer(reducer, initialState)

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
          {/* Quiz code */}
        </div>
      }
    </div>
  );
}

export default Quiz;
