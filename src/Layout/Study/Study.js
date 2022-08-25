import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../../utils/api/index";
import CardList from "./CardList";

export default function Study() {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    getDeck();
  }, [deckId]);

  if (Object.keys(deck).length) {
    return (
      <div>
        {/* breadcrumb/nav bar */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active">Study</li>
          </ol>
        </nav>

        {/* title */}
        <div>
          <h1>{deck.name}: Study</h1>
        </div>

        {/* card list */}
        <CardList cards={deck.cards} />
      </div>
    );
  } else {
    return null;
  }
}
