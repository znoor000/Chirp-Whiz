import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import Home from './Home.js';         // The pages of the app
import Quiz from './Quiz.js';
import UserPage from './UserPage.js';
import About from './About.js';
import Glossary from './Glossary.js';
import Tutorial from './Tutorial.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";    // For navigation between pages
import Amplify, { Auth } from 'aws-amplify';    // Amplify and authentication
import API, { graphqlOperation } from '@aws-amplify/api';   // GraphQL API to database
import PubSub from '@aws-amplify/pubsub';
import { createTodo } from './graphql/mutations';   // Create user entry in database
import { listTodos } from './graphql/queries';    // Get user entries in database
import { onCreateTodo } from './graphql/subscriptions';   // Subscribe to constantly updating data
import awsconfig from './aws-exports';    // Configuring amplify for database
import { withAuthenticator } from 'aws-amplify-react';    // Authentication
import 'bootstrap/dist/css/bootstrap.min.css';    // Bootstrap for general styling
import Navbar from 'react-bootstrap/Navbar';    // Navigation bar
import Nav from 'react-bootstrap/Nav';
import birdList from './birdList';    // Bird info

// Amplify configurations
API.configure(awsconfig);
PubSub.configure(awsconfig);
Amplify.configure(awsconfig);

// Initialize the array that will store user info.
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

// Creates a new entry in the database for the user if it's the first
// time they've signed in. Stores empty values for their correct and
// incorrect arrays.
export async function createNewTodo(userName) {
  let zeroArr = new Array(birdList.length).fill(0);
  const todo = {
    name: userName,
    correct: zeroArr,
    incorrect: zeroArr
  };
  try{
    await API.graphql(graphqlOperation(createTodo, { input: todo }));
  }
  catch(e) {
    console.log('Caught error: ', e)
  }
}

// The app. Starts by rendering the home page. Keeps two bars at the top of the app:
// the sign-out bar for the current user and the navigation bar.
function App() {
  // User data stored in the database.
  const [state, dispatch] = useReducer(reducer, initialState);
  // The current user's username.
  const [user, setUser] = useState('');
  // The current user's email.
  const [userEmail, setUserEmail] = useState('');
  // The current user's index in the user array (state).
  const [userIndex, setUserIndex] = useState();

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
  
  // Gets the user's info from the database. If the user doesn't exist yet, create
  // a new entry in the database. Acquire the user's index in the user array.
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
  
  // Gets the user's info from their log-in authentication. Stores their username
  // and email for use later, mainly for the leaderboard and user profile page.
  async function getUserInfo() {
    let userData = await Auth.currentAuthenticatedUser();
    setUser(userData.username);
    setUserEmail(userData.attributes.email);
  }

  // Renders the app. The authentication tab at the top with the user's username
  // and a sign-out button. Also the navigation bar with links to each page
  // in the app.
  return (
    <div className="App">
      <Navbar variant="light" sticky="top" style={{backgroundColor: '#80ff00'}}>
        <Navbar.Brand href="home">Chirp Whiz</Navbar.Brand>
        <Nav fill className="mr-auto">
          <Nav.Link href="home">Home</Nav.Link>
          <Nav.Link href="tutorial">Tutorial</Nav.Link>
          <Nav.Link href="quiz">Quiz</Nav.Link>
          <Nav.Link href="glossary">Glossary</Nav.Link>
          <Nav.Link href="user-page">User Page</Nav.Link>
          <Nav.Link href="about">About</Nav.Link>
        </Nav>
      </Navbar>
      
      <Router>
        <div>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/tutorial">
              <Tutorial />
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
