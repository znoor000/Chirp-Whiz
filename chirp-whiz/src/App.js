import React from 'react';
import './App.css';
import Home from './Home.js';
import Quiz from './Quiz.js';
import Glossary from './Glossary.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import { createTodo } from './graphql/mutations'
import config from './aws-exports'

API.configure(config)             // Configure Amplify
PubSub.configure(config);

async function createNewTodo() {
  const todo = { name: "Use AppSync" , description: "Realtime and Offline"}
  await API.graphql(graphqlOperation(createTodo, { input: todo }))
}

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
            </ul>
          </nav>

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
      <button onClick={createNewTodo}>Add Todo</button>
    </div>
  );
}

export default App;
