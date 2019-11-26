import React from 'react';
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
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <Navbar bg="primary" variant="dark" sticky="top">
        <Navbar.Brand href="home">Chirp Whiz</Navbar.Brand>
        <Nav fill className="mr-auto">
          <Nav.Link href="home">Home</Nav.Link>
          <Nav.Link href="quiz">Quiz</Nav.Link>
          <Nav.Link href="glossary">Glossary</Nav.Link>
          <Nav.Link href="bird-form">Bird Form</Nav.Link>
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
            <Route path="/bird-form">
              <BirdForm />
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
