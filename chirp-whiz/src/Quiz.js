import React, { useState, useEffect } from 'react';
import birdList from './birdList';
import QuizQuestion from './quizComponents/QuizQuestion';
import ResultPage from './quizComponents/ResultPage';
import AudioButton from './quizComponents/AudioButton';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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