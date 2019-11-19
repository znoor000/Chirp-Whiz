import React from 'react';
import Question from './Question.js';
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

function Quiz() {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/question`}>
              <Question />
            </Route>
            <Route path={match.path}>
            <div>
              <h1>Quiz</h1>
              <Link to={`${match.path}/question`}>
                <button>Start Quiz</button>
              </Link>
            </div>
            </Route>
        </Switch>
    );
}

export default Quiz;