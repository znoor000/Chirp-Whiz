import React from 'react';
import birdList from './birdList';      // Bird info
import AudioButton from './quizComponents/AudioButton';     // For bird audio
import 'bootstrap/dist/css/bootstrap.min.css';      // Bootstrap for general styling
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

/*
    The pop-up modal that appears when you click on a bird's image button on the
    starting page of the tutorial. Supposed to mimic a basic form of the glossary/
    bird info pages in the glossary. Meant to be called in the tutorial once the user
    clicks on one of the 4 buttons.
*/

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

export default BirdModal;