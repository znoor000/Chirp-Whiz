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

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/quiz">Quiz</Link>
              </li>
              <li>
                <Link to="/glossary">Glossary</Link>
              </li>
              <li>
                <Link to="/bird-form">Bird Form</Link>
              </li>
            </ul>
          </nav>

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

export default App;
