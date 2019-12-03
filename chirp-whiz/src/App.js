import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import Home from './Home.js';
import Quiz from './Quiz.js';
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

function App() {
  return (
    <div className="App">
      <Navbar variant="light" sticky="top" style={{backgroundColor: '#80ff00'}}>
        <Navbar.Brand href="home">Chirp Whiz</Navbar.Brand>
        <Nav fill className="mr-auto">
          <Nav.Link href="home">Home</Nav.Link>
          <Nav.Link href="quiz">Quiz</Nav.Link>
          <Nav.Link href="glossary">Glossary</Nav.Link>
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
            <Route path="/quiz">
              <Quiz />
            </Route>
            <Route path="/glossary">
              <Glossary />
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
