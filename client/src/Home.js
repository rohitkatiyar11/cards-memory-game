import React from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import gameService from './services/gameService';

function Home(props) {

    const startGame = async (level) => {
        try {
            let res = await gameService.createGame({ difficulty: level });
            //set new game id locallay
            localStorage.setItem("gameId", res.game._id);
            props.history.push({ pathname: "/game", state: { level } })
        }
        catch (e) {
            alert("Something went wrong!")
        }
    }

    return (
        <Container>
            <Row>
                <Col></Col>
                <Col xs={6}>
                    <Card className="text-center">
                        <Card.Header>Game Level</Card.Header>
                        <Card.Body>
                            <Card.Title>Please Select the game dificulity:</Card.Title>
                            <Button variant="success" onClick={() => startGame("easy")}>Easy</Button>
                            <Button variant="warning" onClick={() => startGame("medium")}>Medium</Button>
                            <Button variant="danger" onClick={() => startGame("hard")}>Hard</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>

            </Row>

        </Container>
    )

}

export default Home;