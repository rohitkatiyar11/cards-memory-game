import React, { useState, useEffect } from "react";
// SERVICES
import gameService from './services/gameService';
import { cards as defaultCards } from './constants/constants'
import shuffleCards from "./logic/shuffleCards";
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
    <div className="deck">
      <div id="deck">
        {
          cards.map((card, index) => (
            <div className={`card ${card.flipped ? "flipped" : "unflipped"}`} key={index} onClick={() => flipCard(index)}>
              <div className="value">{card.flipped ? card.value : "-"}</div>
              <div className={`suit ${card.type} ${card.flipped ? "flipped" : "unflipped"}`}></div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
