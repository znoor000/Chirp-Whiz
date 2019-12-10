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
import Form from 'react-bootstrap/Form';
import birdList from './birdList';



function Glossary () {
  const [state, setState] = useState({
    todos: birdList
  });
  const [birdNum, setBirdNum] = useState(0);
  const [inBirdPage, setInBirdPage] = useState(false);
  const [searchName, setSearchName] = useState('');
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [birdNum])
  
  useEffect(() => {
    console.log(searchName);
  }, [searchName])

  function handleChange(e) {
    setSearchName(e.target.value);
  };

  return(
    <div>
      {state.todos.length > 0 &&
        <div>
          <Switch>
            <Route path={`${match.path}/:birdName`}>
              <Bird bird={state.todos[birdNum]}/>
              <Link to={match.path}>
                <Button variant="secondary">Return</Button>
              </Link>
            </Route>
            <Route path={match.path}>
              <div>
              <h1>Glossary</h1>
              <ButtonGroup vertical>
              <ListGroup variant="flush">
              {state.todos.map((todo, i) =>
                <ListGroup.Item>
                <Link to={`${match.url}/${todo.name}`} key={todo.id}>
                  <Button variant="outline-warning" style={{color: 'black'}} onClick={() => setBirdNum(i)}>
                    <p>{todo.name}</p>
                    <Image src={todo.image[0]} rounded style={{height: '300px'}} />
                  </Button>
                </Link>
                </ListGroup.Item>
              )}
              </ListGroup>
              </ButtonGroup>
              </div>
            </Route>
          </Switch>
        </div>
      }
    </div>
  );
}

export function Bird(props) {
  let { birdName } = useParams();

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
          <Carousel.Item>
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