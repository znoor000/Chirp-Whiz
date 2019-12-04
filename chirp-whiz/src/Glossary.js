import React, { useEffect, useState, useReducer } from 'react';
import AudioButton from './quizComponents/AudioButton';
import API, { graphqlOperation } from '@aws-amplify/api'
import { listTodos } from './graphql/queries'
import { onCreateTodo } from './graphql/subscriptions'
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
import birdList from './birdList';

const initialState = {todos:[]};
export const reducer = (state, action) => {
  switch(action.type){
    case 'QUERY':
      return {...state, todos:action.todos}
    case 'SUBSCRIPTION':
      return {...state, todos:[...state.todos, action.todo]}
    default:
      return state
  }
}

function Glossary () {
  {/*const [state, dispatch] = useReducer(reducer, initialState);*/}
  const [state, setState] = useState({
    todos: birdList
  });
  const [birdNum, setBirdNum] = useState(0);

  {/*useEffect(() => {
    getData()
    const subscription = API.graphql(graphqlOperation(onCreateTodo)).subscribe({
      next: (eventData) => {
        const todo = eventData.value.data.onCreateTodo;
        dispatch({type:'SUBSCRIPTION', todo})
      }
    })
  return () => subscription.unsubscribe()
  }, [])

  async function getData() {
    const todoData = await API.graphql(graphqlOperation(listTodos))
    dispatch({type:'QUERY', todos: todoData.data.listTodos.items});
  }*/}

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [birdNum])
  
  let match = useRouteMatch();
{/*
  function chosenBird(index) {
    setBirdNum(index);
  }*/}

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
       {/*style={{backgroundImage: `url(${props.bird.habitatImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'}}*/}
      <Container>
      <Row>
      <Col>
      {/*<Image src={props.bird.image[0]} rounded />*/}
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