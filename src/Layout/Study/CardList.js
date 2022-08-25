import React, { useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

function CardList({ cards }) {
  const [side, setSide] = useState(true);
  const [card, setCard] = useState(0);
  const { deckId } = useParams();
  const history = useHistory();
  //const cards = decks.cards
  // User flips card
  const flipHandler = () => {
    setSide(!side);
  };

  // User is on last card, ask to restart or return to homepage
  const nextHandler = () => {
    if (card === cards.length - 1) {
      window.confirm("Restart Cards?\n\n Click 'Cancel' to return home")
        ? setCard(() => 0)
        : history.push("/");
      // If not last card, go to next card
    } else {
      setCard((card) => card + 1);
      setSide(() => !side);
    }
  };

  function previousHandler() {
    setCard((card) => card - 1);
    setSide(true);
  }

  // If there are more than two cards in the deck
  if (cards.length > 2) {
    return (
      <div key={deckId} className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {card + 1} of {cards.length}
          </h5>
          <p className="card-text">
            {side ? cards[card].front : cards[card].back}
          </p>
          {/* Flip card button */}
          
          <button className="btn btn-secondary" onClick={flipHandler}>
            Flip
          </button>
          {/* IF card is on backside, provide a button to go to next card*/}
          {side ? null : (
            <button className="btn btn-primary" onClick={nextHandler}>
              Next
            </button>
          )}
          {card >= 1 ? (
            <button
              id="previous"
              className="btn btn-primary"
              onClick={previousHandler}
            >
              Previous
            </button>
          ) : null}
          
        </div>
      </div>
    );
  } else {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Not enough cards.</h5>
          <p className="card-text">
            You need atleast 3 cards to study. There are {cards.length} cards in
            this deck.
          </p>
          <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
            Add Cards
          </Link>
        </div>
      </div>
    );
  }
}

export default CardList;


