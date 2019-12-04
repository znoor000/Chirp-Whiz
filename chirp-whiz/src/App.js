import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import Home from './Home.js';
import Quiz from './Quiz.js';
import UserPage from './UserPage.js';
import About from './About.js';
import Question from './Question.js';
import Glossary from './Glossary.js';
import BirdForm from './BirdForm.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Amplify, { Auth } from 'aws-amplify';
import API, { graphqlOperation } from '@aws-amplify/api';
import PubSub from '@aws-amplify/pubsub';
import { createTodo } from './graphql/mutations';
import { listTodos } from './graphql/queries';
import { onCreateTodo } from './graphql/subscriptions';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import birdList from './birdList';

API.configure(awsconfig);
PubSub.configure(awsconfig);
Amplify.configure(awsconfig);

const initialState = {
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'QUERY':
      return {...state, todos: action.todos};
    case 'SUBSCRIPTION':
      return {...state, todos:[...state.todos, action.todo]}
    default:
      return state;
  }
};

async function createNewTodo(userName) {
  let zeroArr = new Array(birdList.length).fill(0);
  const todo = {
    name: userName,
    correct: zeroArr,
    incorrect: zeroArr
  };
  await API.graphql(graphqlOperation(createTodo, { input: todo }));
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, setUser] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userIndex, setUserIndex] = useState();

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
    getUserInfo();

    let userIsFound = false;
    let userI = 0;
    if (user != '' && state.todos.length != 0) {
      for (let i = 0; i < state.todos.length; i++) {
        if (state.todos[i].name == user)
          userIsFound = true;
      }

      if (!userIsFound)
        createNewTodo(user);
      
      for (let j = 0; j < state.todos.length; j++) {
        if (state.todos[j].name == user)
          userI = j;
      }
      
      setUserIndex(userI);
    }
  }, [state, user]);
  
  async function getUserInfo() {
    let userData = await Auth.currentAuthenticatedUser();
    setUser(userData.username);
    setUserEmail(userData.attributes.email);
  }

  return (
    <div className="App">
      <Navbar variant="light" sticky="top" style={{backgroundColor: '#80ff00'}}>
        <Navbar.Brand href="home">Chirp Whiz</Navbar.Brand>
        <Nav fill className="mr-auto">
          <Nav.Link href="home">Home</Nav.Link>
          <Nav.Link href="quiz">Quiz</Nav.Link>
          <Nav.Link href="glossary">Glossary</Nav.Link>
          <Nav.Link href="user-page">User Page</Nav.Link>
          <Nav.Link href="about">About</Nav.Link>
        </Nav>
      </Navbar>
      
      <Router>
        <div>
          {/*
          <nav>
            <Link to="/"><button>Home</button></Link><br />
            <Link to="/quiz"><button>Quiz</button></Link><br />
            <Link to="/glossary"><button>Glossary</button></Link><br />
            <Link to="/bird-form"><button>Bird Form</button></Link><br />
          </nav>
          */}
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/quiz">
              <Quiz />
            </Route>
            <Route path="/glossary">
              <Glossary />
            </Route>
            <Route path="/user-page">
              {userIndex != undefined &&
                <UserPage
                  name={user}
                  email={userEmail}
                  correct={state.todos[userIndex].correct}
                  incorrect={state.todos[userIndex].incorrect}
                />
              }
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default withAuthenticator(App, true);
