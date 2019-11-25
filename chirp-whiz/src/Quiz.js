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
{/*     not finish yet/need to check more
    return (
        <Switch>
           <Route path={`${match.path}/question`}>
              <Question />
           </Route>
           <Route path={match.path}>
             <div>
              <br /><h2>How many questions you want to try?</h2>
              <form>
              <label>
                <input name="questionNum" type="text" />
              </label>
              </form>
              <Link to={`${match.path}/question`}>
              <Button variant="outline-light" size="lg" style={{backgroundColor: "#ffa333"}}>Start</Button>
              </Link>
             </div>
           </Route>
        </Switch>
    ); */}
}

export default Quiz;