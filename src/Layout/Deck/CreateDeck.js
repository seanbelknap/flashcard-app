import React, { useState } from "react";
import DeckForm from "./DeckForm";
import { createDeck } from "../../utils/api";
import { useHistory, Link } from "react-router-dom";

function CreateDeck() {
  const history = useHistory();
  const initialFormState = {
    name: "",
    description: "",
  };
  const [newDeck, setNewDeck] = useState({ ...initialFormState });

  async function addNewDeck() {
    const abortController = new AbortController();
    return await createDeck(newDeck, abortController.signal);
  }

  const handleChange = ({ target }) => {
    setNewDeck({
      ...newDeck,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addNewDeck().then(({ id }) => history.push(`/decks/${id}`));
    setNewDeck({ ...initialFormState });
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item active">Create Deck</li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <DeckForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        deck={newDeck}
      />
    </>
  );
}

export default CreateDeck;
