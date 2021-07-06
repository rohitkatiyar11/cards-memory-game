
import React from "react";
import { Modal, Button } from 'react-bootstrap';

export default function GameOver(props) {

    const changeLevel = () => {
        props.history.push("/");
    }
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Game Over!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Woohoo, you cleared this round successfully!</div>
                    <br />
                    <div><span>Elapsed Time: {props.elapsedTime}</span></div>
                    <div><span>Error Score: <strong>{props.errorCounts}</strong></span></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={changeLevel}>
                        Start Again
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}