import React, { useState, useEffect } from 'react';
import birdList from './birdList';
import AudioButton from './quizComponents/AudioButton';
import AnswerPage from './quizComponents/AnswerPage';
import { BrowserRouter as Router, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import BirdModal from './BirdModal';

export function randomize(type, oldBird) {
    if (type == "learn") {
        var arr = [];
        while(arr.length < 4){
            var r = Math.floor(Math.random() * birdList.length);
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        return arr;
    } else {
        let newCorrectBird = 0;
        do {
            newCorrectBird = Math.floor(Math.random() * 4);
        } while (newCorrectBird === oldBird);
        return newCorrectBird;
    }
}

export function goToPage() {
  setTimeout(() => window.location.reload(false), 200);
}

export function checkAnswer(choice, correctBird) {
    var aType = "";
    if (choice === correctBird) {
      aType = "correct";
    } else {
      aType = "incorrect";
    }
  
    return aType;
}

function Tutorial() {
    const [learningBirds, setLearningBirds] = useState([0, 1, 2, 3]);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentBird, setCurrentBird] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const [answered, setAnswered] = useState(false);
    const [correctBird, setCorrectBird] = useState(0);
    const [answerType, setAnswerType] = useState("none_yet");

    useEffect(() => {
        let oldBird = correctBird;
        setLearningBirds(randomize("learn"));
        setCorrectBird(randomize("correct", oldBird));
    }, []);

    useEffect(() => {
      if (quizStarted && answerType != "none_yet") {
        setAnswered(true);
      }
      
      if (answerType == "correct") {
        setCorrectAnswers(correctAnswers + 1);
      }
    }, [answerType]);

    function AnswerButton(props) {
        return (
        <Button 
            variant="outline-light"
            size="lg"
            style={{backgroundColor: "#ffa333"}}
            block
            onClick={() => setAnswerType(checkAnswer(props.answerID, props.correctBird))}>
            <div>{props.bird.name}</div>
        </Button>
        )
    }

    function nextQuestion() {
      if (correctAnswers === 5) {
        setQuizStarted(!quizStarted);
      } else {
        let oldBird = correctBird;
        setAnswerType('none_yet');
        setAnswered(false);
        setCorrectBird(randomize("correct", oldBird));
      }
    }
  
    function renderQuestion() {
        return (
        <div>
            <h4>Identify this bird:</h4>
            <Image src={birdList[learningBirds[correctBird]].image[0]} thumbnail style={{height: '300px'}}/>
            <AudioButton sound={birdList[learningBirds[correctBird]].sound} />
            <Container>
            <Row>
                <Col>
                <AnswerButton bird={birdList[learningBirds[0]]} answerID={0} correctBird={correctBird} />
                </Col>
                <Col>
                <AnswerButton bird={birdList[learningBirds[1]]} answerID={1} correctBird={correctBird} />
                </Col>
                <Col>
                <AnswerButton bird={birdList[learningBirds[2]]} answerID={2} correctBird={correctBird} />
                </Col>
                <Col>
                <AnswerButton bird={birdList[learningBirds[3]]} answerID={3} correctBird={correctBird} />
                </Col>
            </Row>
            </Container>
        </div>
        );
    }

    function renderResult() {
        return (
        <div>
            <AnswerPage answerType={answerType} bird={birdList[learningBirds[correctBird]]} birdImage={0} />
            <Button
            variant="outline-light"
            size="lg"
            style={{backgroundColor: "#ffa333"}}
            onClick={() => nextQuestion()}
            >Next Question</Button>
        </div>
        );
    }

    return (
        <div>
            {quizStarted ? (
                answered ? (
                renderResult()
                ) : (
                renderQuestion()
                )
            ) : (
                correctAnswers === 5 ? (
                    <div>
                    <h1>Congrats!</h1>
                    <h2>You answered five questions correctly</h2><br /><br />
                    <h4>Now you can learn more about birds in the glossary</h4>
                    <h4>Or take the quiz to test your skills</h4><br /><br />
                    <Router>
                    <Row>
                        <Col>
                            <Link to="/quiz">
                                <Button
                                variant="outline-light"
                                size="lg"
                                style={{backgroundColor: "#ffa333"}}
                                onClick={() => goToPage()}
                                >Take the full quiz</Button>
                            </Link>
                        </Col>
                        <Col>
                            <Link to="/glossary">
                                <Button
                                variant="outline-light"
                                size="lg"
                                style={{backgroundColor: "#ffa333"}}
                                onClick={() => goToPage()}
                                >Learn more in the glossary</Button>
                            </Link>
                        </Col>
                    </Row>
                    </Router>
                    </div>
                ) : (
                <div>
                <br /><h2>Start by observing the following birds:</h2><br />
                <Row>
                    {learningBirds.map(bird =>
                        <Col key={bird}>
                        <Button
                        variant="outline-warning"
                        style={{color: 'black'}}
                        onClick={() => {
                            setCurrentBird(bird);
                            setModalShow(true);
                        }}
                        ><Image src={birdList[bird].image[0]} rounded style={{height: '200px'}} /></Button>
                        </Col>
                    )}
                </Row>
                <br /><br />
                <h4>Then identify the given bird by its image and bird call</h4>
                <h4>(the quiz will end once you have successfully identified 5 birds)</h4>
                <br />
                <Row>
                    <Col>
                        <Button
                        variant="outline-light"
                        size="lg"
                        style={{backgroundColor: "#ffa333"}}
                        onClick={() => setQuizStarted(true)}
                        >Start practice quiz</Button>
                    </Col>
                </Row>

                <BirdModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    birdNum = {currentBird}
                />
                </div>
            ))}<br />
            {(quizStarted || correctAnswers === 5) && 
            <Button variant="secondary" onClick={() => setTimeout(() => window.location.reload(false), 200)}>Start over</Button>
            }
        </div>
    )
}

export default Tutorial;