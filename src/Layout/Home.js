import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api";

export default function Home({ decks }) {
  function handleClick(id) {
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

  useEffect(() => {}, [decks]);
  const content = decks.map((deck) => {
    return (
      <div key={deck.id} className="card">
        <div className="card-body">
          <div className="row justify-content-between">
          <h5 className="card-title">{deck.name}</h5>
          <h2 style={{fontSize: '15px'}}>{`${deck.cards.length} cards`}</h2>
          </div>
          
          <p className="card-text">{deck.description}</p>
          <div className="row justify-content-between">
            <div>
              <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
                View
              </Link>
              <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
                Study
              </Link>
            </div>
            <button className="btn btn-danger" onClick={()=>handleClick(deck.id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Link className="btn btn-secondary" to="/decks/new">
        Create Deck
      </Link>
      {content}
    </div>
  );
}
