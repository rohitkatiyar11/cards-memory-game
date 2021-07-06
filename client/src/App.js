import React, { useState, useEffect } from "react";
// SERVICES
import gameService from './services/gameService';
import shuffleCards from "./logic/shuffleCards";
import { Container, Row, Col, Card } from 'react-bootstrap';
import "./App.css";
import GameOver from "./GameOver";

function App(props) {
  const [gameId, setGameId] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  let [errorCounts, setErrorCounts] = useState(0);
  let [elapsedTime, setElapsedTime] = useState(0);
  const [startMatching, setStartMatching] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    // Get local game id
    const localGameId = localStorage.getItem("gameId");
    if (!gameId && localGameId) {
      setGameId(localGameId);
    }
    if (cards.length === 0) {
      setCards(shuffleCards(props.location.state.level));
    }
  }, [gameId, cards.length, props.location.state.level])

  const flipCard = (index) => {
    let cardsCopy = [...cards];
    cardsCopy[index].flipped = true;
    setCards([...cardsCopy]);
    startTimer();
    const selectedCardsArr = [...selectedCards, index];
    setSelectedCards(selectedCardsArr);

    const revealedCardsLength = selectedCardsArr.length;

    if (revealedCardsLength >= 2 && revealedCardsLength % 2 === 0) {
      checkMatchedCards(selectedCardsArr, revealedCardsLength);
    }
  }

  const startTimer = () => {
    let timer = setInterval(() => {
      if (!cards.some(card => !card.hide)) {
        clearInterval(timer);
      } else {
        setElapsedTime(++elapsedTime)
      }
    }, 1000);
  }

  const unflipCard = (index) => {
    let cardsCopy = [...cards];
    cardsCopy[index].flipped = false;
    setCards([...cardsCopy]);
  }

  const checkMatchedCards = (selectedCards, revealedCardsLength) => {
    setStartMatching(true);
    let timeleft = 3;
    let timer = setInterval(() => {
      if (timeleft <= 0) {
        clearInterval(timer);
        setStartMatching(false);
        if (cards[selectedCards[revealedCardsLength - 1]].value === cards[selectedCards[revealedCardsLength - 2]].value) {
          [selectedCards[revealedCardsLength - 1], selectedCards[revealedCardsLength - 2]].forEach(element => {
            hideCard(element);
          });
        } else {
          setErrorCounts(++errorCounts);
          selectedCards.forEach(element => {
            unflipCard(element);
          });
        }
      }
      timeleft -= 1;
    }, 1000);
  }

  const saveGameStates = async () => {
    try {
      await gameService.updateGame(gameId, { difficulty: props.location.state.level, errorCounts, elapsedTime });
      setIsGameOver(true);
    }
    catch (e) {
      alert("Something went wrong!")
    }
  }

  const hideCard = (index) => {
    let cardsCopy = [...cards];
    cardsCopy[index].hide = true;
    setCards([...cardsCopy]);
    if (!cardsCopy.some(card => !card.hide)) {
      saveGameStates();
    }
  }

  const getCardClasses = (card) => {
    let classes = "unflipped";
    if (card.flipped) {
      classes = "flipped";
    }
    if (card.hide) {
      classes += " hidden";
    }

    if (startMatching) {
      classes += " matching";
    }
    return classes;
  }

  const getElapsedTime = () => {
    return <strong>{parseInt(elapsedTime / 60)} min, {elapsedTime % 60} seconds</strong>;
  }

  const handleGameOverClose = () => {
    setIsGameOver(false);
  }

  return (

    <Container>
      <Row>
        <Col></Col>
        <Col xs={10}>
          <Card className="text-center">
            <Card.Header>
              <span>Elapsed Time: {getElapsedTime()}</span>
              <span>Error Score: {startMatching ? "Waiting.." : <strong>{errorCounts}</strong>}</span>
            </Card.Header>
            <Card.Body>

              {
                cards.map((card, index) => (
                  <div className={`card ${getCardClasses(card)}`} key={index} onClick={!card.flipped && !startMatching ? () => flipCard(index) : () => { }}>
                    <span className="value">{card.flipped ? card.value : "-"}</span>
                    <div className={`suit ${card.type} ${card.flipped ? "flipped" : "unflipped"}`}></div>
                  </div>
                ))
              }
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
      <GameOver handleClose={handleGameOverClose} show={isGameOver} elapsedTime={getElapsedTime()} errorCounts={errorCounts} {...props} />
    </Container>
  );
}

export default App;
