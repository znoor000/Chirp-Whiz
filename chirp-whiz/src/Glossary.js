import React, { useEffect, useState } from 'react';
import AudioButton from './quizComponents/AudioButton';   // For bird audio
import 'bootstrap/dist/css/bootstrap.min.css';    // Bootstrap for general styling
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';  // For listing the bird buttons
import ListGroup from 'react-bootstrap/ListGroup';    // For listing the birds on the main page
import Card from 'react-bootstrap/Card';    // For the bird info pages
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';    // To display multiple images for each bird
import Form from 'react-bootstrap/Form'   // For the search bar
import birdList from './birdList';    // Bird info

/*
  The glossary is mainly a presentational component that lists all of the birds
  and buttons linking to their respective profile pages. These pages were originally
  separate pages but have since changed to be rendered on the same page as the glossary.
  The bird info pages contain all of the bird info. Their images are shown in a carousel
  so the user can cycle through all of the images.
*/

// Renders the entire glossary page.
function Glossary () {
  // Array of the birds and their info.
  const [state, setState] = useState({todos: birdList});
  // Index in the array of the chosen bird to be displayed.
  const [birdNum, setBirdNum] = useState(0);
  // Boolean value of whether we are viewing a specific bird in the glossary.
  const [inBirdPage, setInBirdPage] = useState(false);
  // Value for the search bar.
  const [searchName, setSearchName] = useState('');

  // Scrolls to the top of the page when either viewing a bird's page
  // or returning to the main glossary.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [birdNum])

  // Changes the search bar value as it is changed so that birds appear on the page
  // as the user types into the search bar.
  function handleChange(e) {
    setSearchName(e.target.value);
  };

  // Renders the glossary page. Initially renders a list of buttons with the bird images
  // on them along with a search bar. The buttons then rerender the page with only a card
  // containing the chosen bird's info.
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

// Returns a card containing the specified bird's info.
// The prop is the bird object containing its info such as
// name, image array, sound, scientificName, birdType, and habitat.
// Bird images are shown in a carousel.
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