import React, { useState, useEffect } from "react";
// SERVICES
import gameService from './services/gameService';
import { cards as defaultCards } from './constants/constants'
import shuffleCards from "./logic/shuffleCards";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import "./App.css";

function App() {
  const [game, setGame] = useState(null);
  const [cards, setCards] = useState([])

  useEffect(() => {
    if (!game) {
      getGame();
    }
    if (cards.length == 0) {
      setCards(shuffleCards(defaultCards));
    }
  })

  const getGame = async () => {
    let res = await gameService.getGameById("60df629dfb473bb511b5f7a6");
    console.log(res);
    setGame(res);
  }

  const flipCard = (index) => {
    let cardsCopy = [...cards];
    cardsCopy[index].flipped = true;
    setCards(cardsCopy);
  }
  return (

    <Container>
      <Row>
        <Col></Col>
        <Col xs={10}>
          <Card className="text-center">
            <Card.Header>
            <span>Elapsed Time: <strong>1 min</strong></span>
            <span>Error Score: <strong>3</strong></span>
            </Card.Header>
            <Card.Body>
             
              {
                cards.map((card, index) => (
                  <div className={`card ${card.flipped ? "flipped" : "unflipped"}`} key={index} onClick={() => flipCard(index)}>
                    {card.flipped && <span className="value">{card.value}</span>}
                    <div className={`suit ${card.type} ${card.flipped ? "flipped" : "unflipped"}`}></div>
                  </div>
                ))
              }
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default App;
