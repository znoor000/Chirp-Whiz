import React from 'react';
import Question from './Question.js';
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Button from 'react-bootstrap/Button';

function Quiz() {
    let match = useRouteMatch();

    return (
        <Switch>
           <Route path={`${match.path}/question`}>
             
           </Route>
        </Switch>
    );
}

export default Quiz;