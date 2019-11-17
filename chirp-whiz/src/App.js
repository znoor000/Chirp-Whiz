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
            <Link to="/">Home</Link><br />
            <Link to="/quiz">Quiz</Link><br />
            <Link to="/glossary">Glossary</Link><br />
            <Link to="/bird-form">Bird Form</Link><br />
          </nav>

          <Switch>
            <Route path="/quiz">
              <Quiz />
              <Link to="/">
                <button>Home page</button>
              </Link>
            </Route>
            <Route path="/glossary">
              <Glossary />
              <Link to="/">
                <button>Home page</button>
              </Link>
            </Route>
            <Route path="/bird-form">
              <BirdForm />
              <Link to="/">
                <button>Home page</button>
              </Link>
            </Route>
            <Route path="/">
              <Home />
              <Link to="/quiz">
                <button>Go to quiz</button>
              </Link>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
