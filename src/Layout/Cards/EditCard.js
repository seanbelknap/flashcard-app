import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory, Link } from "react-router-dom";
import { readCard, updateCard, readDeck } from "../../utils/api";
import CardForm from "./CardForm";

function EditCard() {
  const { path, url, params } = useRouteMatch();
  const { cardId, deckId } = params;
  const history = useHistory();
  const initialFormState = {
    front: "",
    back: "",
  };
  const [editCard, setEditCard] = useState({ ...initialFormState });
  const [deck, setDeck] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    async function editExistingCard() {
      try {
        setEditCard(await readCard(cardId, abortController.signal));
      } catch (error) {
        console.log(error);
      }
    }
    async function viewDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (error) {
        console.log(error);
      }
    }
    deckId && viewDeck();
    cardId && editExistingCard();
    return () => {
      abortController.abort();
    };
  }, [cardId, deckId]);

  async function EditCard() {
    const abortController = new AbortController();
    return await updateCard(editCard, abortController.signal);
  }

  const handleChange = ({ target }) => {
    setEditCard({
      ...editCard,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    EditCard().then(({ deckId}) => history.push(`/decks/${deckId}`));
    setEditCard({ ...initialFormState });
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Edit Card {cardId}</li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      <CardForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        card={editCard}
        deck={deck}
      />
    </>
  );
}

export default EditCard;
