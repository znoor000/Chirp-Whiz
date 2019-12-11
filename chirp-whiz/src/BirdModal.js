import React from 'react';
import birdList from './birdList';
import AudioButton from './quizComponents/AudioButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

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