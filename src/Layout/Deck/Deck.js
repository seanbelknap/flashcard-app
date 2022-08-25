import React, { useState, useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import EditDeck from "./EditDeck";
import { readDeck, deleteCard, deleteDeck } from "../../utils/api";

export default function Deck() {
  const { path, url, params } = useRouteMatch();
  const { deckId } = params;
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function editExistingDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
        setCards(response.cards);
      } catch (error) {
        console.log(error);
      }
    }
    deckId && editExistingDeck();
    return () => {
      abortController.abort();
    };
  }, []);


  function handleDeckDelete(id) {
    const abortController = new AbortController()

    if (
      window.confirm(
        "Delete this Deck?\n\n You will not be able to recover it."
      )
    ) {
      deleteDeck(id, abortController.signal)
      window.location.reload(false);
    }
  }

  function handleCardDelete(id) {
    const abortController = new AbortController()

    if (
      window.confirm(
        "Delete this Card?\n\n You will not be able to recover it."
      )
    ) {
      deleteCard(id, abortController.signal)
      window.location.reload(false);
    }
  }

  const cardList = cards.map((card) => {
    return (
      <div className="card mb-3" key={card.id}>
        <div className="row no-cutters justify-content-between">
          <div className="col-6">
            <div className="card-body">
              <p className="card-text">{card.front}</p>
            </div>
          </div>
          <div className="col-6">
            <div className="card-body">
              <p className="card-text">{card.back}</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-end no-gutters">
          <Link
            to={`/decks/${deck.id}/cards/${card.id}/edit`}
            className="btn btn-secondary"
          >
            Edit
          </Link>
          <button type="button" className="btn btn-danger"  onClick={()=>handleCardDelete(card.id)}>
            Delete
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="justify-content">
      <h2>{deck.name}</h2>
      <p className="card-text">{deck.description}</p>
      <div className="row justify-content-between no-gutters">
        <div>
          <Link to={`${url}/edit`} type='button' className="btn btn-secondary">
            Edit
          </Link>
          <Link to={`${url}/study`} className="btn btn-primary">
            Study
          </Link>
          <Link to={`${url}/cards/new`} className="btn btn-primary">
            Add Cards
          </Link>
        </div>
        <button className="btn btn-danger" onClick={()=>handleDeckDelete(deck.id)}>Delete</button>
      </div>
      <h1>Cards</h1>
      {cardList}
    </div>
  );
}
