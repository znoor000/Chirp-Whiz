import React, { useEffect, useState, useReducer } from 'react';
import AudioButton from './quizComponents/AudioButton';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form'
import birdList from './birdList';

function Glossary () {
  const [state, setState] = useState({todos: birdList});
  const [birdNum, setBirdNum] = useState(0);
  const [inBirdPage, setInBirdPage] = useState(false);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [birdNum])

  function handleChange(e) {
    setSearchName(e.target.value);
  };

  return(
    <div>
      {state.todos.length > 0 &&
        <div>
          {inBirdPage ? (
            <div>
              <Bird bird={state.todos[birdNum]}/>
              <Button variant="secondary" onClick={() => setInBirdPage(false)}>Return</Button>
            </div>
          ) : (
            <div>
              <h1>Glossary</h1><br />
              <div>
                <Form.Group as={Row} controlId="formBasicName">
                <Form.Label column sm="2">Bird Search:</Form.Label>
                <Col sm="8">
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Enter the name of a bird"
                  onChange={handleChange}
                />
                </Col>
                </Form.Group>
              </div>
              <ButtonGroup vertical>
              <ListGroup variant="flush">
              {state.todos.map((todo, i) =>
              <div key={i}>
                {todo.name.includes(searchName) &&
                <ListGroup.Item>
                  <Button variant="outline-warning" style={{color: 'black'}} onClick={() => {
                    setBirdNum(i);
                    setInBirdPage(true);
                  }}>
                    <p>{todo.name}</p>
                    <Image src={todo.image[0]} rounded style={{height: '300px'}} />
                  </Button>
                </ListGroup.Item>
                }
              </div>
              )}
              </ListGroup>
              </ButtonGroup>
            </div>
          )}
        </div>
      }
    </div>
  );
}

export function Bird(props) {
  return(
    <div>
      <Card className="text-center">
      <Card.Header><h2>{props.bird.name}</h2></Card.Header>
      <Card.Body>
      <Container>
      <Row>
      <Col>
      <Carousel>
        {props.bird.image.map((imag, i) =>
          <Carousel.Item key={i}>
            <Image src={imag} rounded style={{height: '360px'}} />
          </Carousel.Item>
        )}
      </Carousel>
      </Col>
      <Col>
      <AudioButton sound={props.bird.sound}/>
      <br />
      <h3>Scientific Name:</h3>
      <h5>{props.bird.scientificName}</h5><br />
      <h3>Bird Type:</h3>
      <h5>{props.bird.birdType}</h5><br />
      <h3>Habitat:</h3>
      <h5>{props.bird.habitat}</h5><br />
      </Col>
      </Row>
      </Container>
      </Card.Body>
      </Card>
    </div>
  );
}

export default Glossary;