import { useState } from "react";
import { useEffect } from "react";
import cardsData from "../data.json";
import Card from "./card";
function GameBoard() {
  const [cards, setCards] = useState(cardsData.slice(0, 9));
  const [flipped, setFlipped] = useState(Array(20).fill(false));
  const [cardsFlipped, setCardsFlipped] = useState(1);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [matchesNeeded, setMatchesNeeded] = useState(20);
  const [matches, setMatches] = useState(0);
  useEffect(() => {
    gameSetup();
  }, []);

  useEffect(() => {
    if (firstCard !== null && secondCard !== null) {
      compareCards();
      setFirstCard(null);
      setSecondCard(null);
    }
  }, [firstCard, secondCard]);

  useEffect(() => {
    console.log("matches " + matches);
    if (matches === matchesNeeded) {
      console.log("You win!");
    }
  }, [matches]);

  function compareCards() {
    console.log("firstCard:", cards[firstCard].name);
    console.log("secondCard:", cards[secondCard].name);
    if (cards[firstCard].name === cards[secondCard].name) {
      console.log("match!");
      setCardsFlipped(1);
      setMatches(matches + 1);
    } else {
      console.log("no match!");
      setTimeout(() => {
        const toBeFlipped = flipped.slice();
        toBeFlipped[firstCard] = false;
        toBeFlipped[secondCard] = false;
        setCardsFlipped(1);

        setFlipped(toBeFlipped);
      }, 1000);
    }
  }

  function gameSetup() {
    console.log("This should only run once ");
    let cardsArray = cardsData;
    cardsArray.sort(() => Math.random() - 0.5);
    cardsArray = cardsArray.slice(-10);
    cardsArray = cardsArray.concat(cardsArray);
    cardsArray.sort(() => Math.random() - 0.5);
    setCards(cardsArray);
    setMatchesNeeded(cardsArray.length / 2);
    console.log(cardsArray);
  }

  function handleClick(i) {
    if (cardsFlipped === 3) {
      //Prevents the function from running if cards are already being compared - needed to fix a bug
      return;
    }

    const nextFliped = flipped.slice();
    nextFliped[i] = true;
    setFlipped(nextFliped);
    setCardsFlipped(cardsFlipped + 1);

    if (cardsFlipped === 1) {
      setFirstCard(i);
    } else {
      setSecondCard(i);
    }
  }

  return (
    <>
      <div>Matching card game</div>
      <div className="game-container">
        {cards.map((cards, index) => (
          <Card
            img={cards.url}
            flipped={flipped[index]}
            onclick={() => handleClick(index)}
            key={index}
          />
        ))}
      </div>
    </>
  );
}

export default GameBoard;
