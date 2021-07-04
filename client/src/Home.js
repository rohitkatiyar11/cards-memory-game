import React from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
function Home() {

    return (
        <Container>
            <Row>
                <Col></Col>
                <Col xs={6}>
                    <Card className="text-center">
                        <Card.Header>Game Level</Card.Header>
                        <Card.Body>
                            <Card.Title>Please Select the game dificulity:</Card.Title>
                             <Button variant="success">Easy</Button>
                             <Button variant="warning">Medium</Button>
                             <Button variant="danger">Hard</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>

            </Row>

        </Container>
    )

}

export default Home;