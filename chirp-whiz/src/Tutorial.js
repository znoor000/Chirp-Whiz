import React, { useState, useEffect } from 'react';
import birdList from './birdList';
import AudioButton from './quizComponents/AudioButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

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

export function checkAnswer(choice, correctBird) {
  var aType = "";
  if (choice === correctBird) {
    aType = "correct";
  } else {
    aType = "incorrect";
  }

  return aType;
}

function BirdModal(props) {
  return(
      <Modal
          show={props.show}
          onHide={props.onHide}
          size="lg"
          centered
      >
          <Modal.Header closeButton>
              <Modal.Title>{birdList[props.birdNum].name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Container>
                  <Row className="show-grid">
                      <Col>
              <Image src={birdList[props.birdNum].image[0]} rounded style={{height: '360px'}} />
              </Col>
              </Row>
              <Row className="show-grid">
                  <Col>
              <AudioButton sound={birdList[props.birdNum].sound}/>
              </Col>
              </Row>
              </Container>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={props.onHide}>Close</Button>
          </Modal.Footer>
      </Modal>
  );
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

  return (
    <div>
      {quizStarted ? (
        answered ? (
          <div></div>
          ) : (
            renderQuestion()
          )
      ) : (
        correctAnswers === 5 ? (
          <div></div>
        ) : (
        <div>
          <br /><h1>Start by observing the following birds:</h1><br />
          <Row>
            {learningBirds.map(bird =>
              <Col>
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
          <h2>Then identify the given bird by its image and call</h2><br />
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
        )
      )}<br />
      {(quizStarted || correctAnswers === 5) && 
      <Button variant="secondary" onClick={() => setTimeout(() => window.location.reload(false), 200)}>Start over</Button>
      }
    </div>
  )
}

export default Tutorial;