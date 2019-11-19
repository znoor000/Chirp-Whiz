import React, { Component } from 'react';
import './Home.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Home extends Component {
    render() {
      return(
        <div className="homepage">
          <br /><h1>Chirp Whiz</h1><br />
          <p>
          <Link to="/quiz">
            <Button variant="outline-light" size="lg" style={{backgroundColor: "#ffa333"}}>Start Quiz Now</Button>
          </Link>
          </p><br />
          <Row>
            <Col>
          <Link to="/glossary">
            <Button variant="primary">Check out the glossary</Button>
          </Link>
          </Col>
          <Col>
          <Link to="/bird-form">
            <Button variant="primary">Add a new bird to the collection</Button>
          </Link>
          </Col>
          </Row>
        </div>
      );
    }
  }

export default Home;