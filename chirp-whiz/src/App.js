import React from 'react';
import './App.css';
import Home from './Home.js';
import Quiz from './Quiz.js';
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

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <Router>
        <div className="makeAppTall">
          <nav>
            <Link to="/"><button>Home</button></Link><br />
            <Link to="/quiz"><button>Quiz</button></Link><br />
            <Link to="/glossary"><button>Glossary</button></Link><br />
            <Link to="/bird-form"><button>Bird Form</button></Link><br />
          </nav>

          <Switch>
            <Route path="/quiz">
              <Quiz />
              <Link to="/">
                <div className="bottomButton">
                  <button>Home page</button>
                </div>
              </Link>
            </Route>
            <Route path="/glossary">
              <Glossary />
              <Link to="/">
                <div className="bottomButton">
                  <button>Home page</button>
                </div>
              </Link>
            </Route>
            <Route path="/bird-form">
              <BirdForm />
              <Link to="/">
                <div className="bottomButton">
                  <button>Home page</button>
                </div>
              </Link>
            </Route>
            <Route path="/">
              <Home />
              <Link to="/quiz">
                <div className="bottomButton">
                  <button>Go to quiz</button>
                </div>
              </Link>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default withAuthenticator(App, true);
