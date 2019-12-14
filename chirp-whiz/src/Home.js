import React, { Component } from 'react';
import './Home.css';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";    // React Router for linking to the other pages in the app
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap for general styling
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

/*
  The home page for Chirp Whiz. Mainly contains links to the other pages in the app.
  Encourages users to try the tutorial containg the practice quiz. Contains
  minimal styling to avoid clutter. Includes an image of a sillouette of a grackle
  to fill in empty space and give the page some uniqueness while keeping the style minimal.
*/

// Refreshes the page on button click so that the app can rerender each new page.
export function goToPage() {
  setTimeout(() => window.location.reload(false), 200);
}

// Renders the home page containing links to other pages.
class Home extends Component {
    render() {
      return(
        <div className="homepage">
          <br /><h1>Chirp Whiz</h1><br /><br />
          <Row>
          <Col>
          <Image src={'https://creazilla-store.fra1.digitaloceanspaces.com/silhouettes/2866/blackbird-silhouette-fd8c25-md.png?fbclid=IwAR12_n0FiK2A_2UG6GK3CrkT5RN63DX-4v2mFv1fVWuudaH0HOZhQhs19lQ'} rounded style={{height: '360px'}} />
          </Col>
          <Col>
          <Router>
          <Row>
          <Col>
          <h4>New to the app (or need to practice)?:</h4>
          <Link to="/tutorial">
            <Button
              variant="outline-light"
              size="lg"
              style={{backgroundColor: "#ffa333"}}
              onClick={() => goToPage()}
            >Try the tutorial</Button>
          </Link>
          </Col>
          </Row><br /><br /><br />
          <Link to="/quiz">
            <Button
              variant="outline-light"
              size="lg"
              style={{backgroundColor: "#ffa333"}}
              onClick={() => goToPage()}
            >Go to quiz page</Button>
          </Link>
          <br /><br />
          <Link to="/glossary">
            <Button
              variant="outline-light"
              size="lg"
              style={{backgroundColor: "#ffa333"}} onClick={() => goToPage()}>Check out the glossary</Button>
          </Link>
          <br /><br />
          <Link to="/user-page">
            <Button
              variant="outline-light"
              size="lg"
              style={{backgroundColor: "#ffa333"}} onClick={() => goToPage()}>Go to your user profile</Button>
          </Link>
          </Router>
          </Col>
          </Row>
        </div>
      );
    }
  }

export default Home;