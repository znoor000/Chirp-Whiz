import React, { useState, useEffect } from 'react';
import birdList from './birdList';      // Bird info
import AudioButton from './quizComponents/AudioButton';     // For the questions
import AnswerPage from './quizComponents/AnswerPage';       // For the answer pages
import { BrowserRouter as Router, Link } from "react-router-dom";   // Linking to other pages
import 'bootstrap/dist/css/bootstrap.min.css';      // Bootstrap for general styling
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import BirdModal from './BirdModal';        // Modal for the bird info before the practice quiz

/*
    The tutorial is a combination of the quiz and the glossary. It's intended to be
    beginner friendly so that new users can be eased into the flow of the app.
    It starts with giving the user four random birds to study from. The bird images
    are on buttons that when clicked render a modal with the name, image, and audio
    of that bird. The user then starts the practice quiz when they are ready.
    The practice quiz is similar to the regular quiz except that it doesn't keep track
    of which birds are (in)correctly identified, so they may repeat without prejudice.
    The quiz goes on until the user gives 5 correct answers. No stats are recorded so
    there is no pressure during the practice quiz. Once completed the user is linked to
    the glossary and regular quiz.
*/

// Randomiizes either the learning birds array or the current bird being questioned.
// Returns either intended output depending on the value of 'type':
//      "learn" for learning birds
//      "correct" for correct bird for the current question
// Also takes in the previous correct bird so that a bird isn't repeated twice in a row.
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

// Refreshes the page when the return button is pressed, resetting the tutorial.
export function goToPage() {
  setTimeout(() => window.location.reload(false), 200);
}

// Checks to see if the user answered the question correctly.
// Returns "correct" or "incorrect" depending on whether the answer choice (choice)
// matches the bird being questioned (correctBird).
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
    // The 4 birds used in the practice quiz.
    const [learningBirds, setLearningBirds] = useState([0, 1, 2, 3]);
    // The amount of questions answered correctly.
    const [correctAnswers, setCorrectAnswers] = useState(0);
    // Whether the quiz has started yet.
    const [quizStarted, setQuizStarted] = useState(false);
    // Which bird is shown on the modal.
    const [currentBird, setCurrentBird] = useState(0);
    // Showing the modal.
    const [modalShow, setModalShow] = useState(false);
    // Whether the question is answered yet or not.
    const [answered, setAnswered] = useState(false);
    // Which bird is the correct answer for the current question.
    const [correctBird, setCorrectBird] = useState(0);
    // Whether the question was answered right or wrong.
    const [answerType, setAnswerType] = useState("none_yet");

    // Initializes the learning birds and correct bird for the quiz.
    useEffect(() => {
        let oldBird = correctBird;
        setLearningBirds(randomize("learn"));
        setCorrectBird(randomize("correct", oldBird));
    }, []);

    // Happens when a question is answered, allows the answer page to show after
    // eacch question and keeps track of correct answers.
    useEffect(() => {
      if (quizStarted && answerType != "none_yet") {
        setAnswered(true);
      }
      
      if (answerType == "correct") {
        setCorrectAnswers(correctAnswers + 1);
      }
    }, [answerType]);

    // The multiple-choice answer buttons on the quiz, checks answer on click.
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

    // Sets new values for the next question once user leaves each answer page.
    // Also ends the quiz once 5 questions answered correctly.
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
  
    // Questions page in the quiz, renders the current correct bird and the
    // answer buttons.
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

    // Renders the answer page in between each question.
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

    // Renders the initial study page at first, then alternates between rendering the
    // question and answer pages until 5 questions are answered correctly. Then renders
    // the results page which links to the glossary and quiz.
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