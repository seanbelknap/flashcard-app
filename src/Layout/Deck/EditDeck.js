import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory, Link } from "react-router-dom";
import { updateDeck, readDeck } from "../../utils/api";
import DeckForm from "./DeckForm";

function EditDeck() {
  const { path, url, params } = useRouteMatch();
  const { deckId } = params;

  const history = useHistory();
  const initialFormState = {
    name: "",
    description: "",
  };
  const [editDeck, setEditDeck] = useState({ ...initialFormState });

  useEffect(() => {
    const abortController = new AbortController();
    async function editExistingDeck() {
      try {
        setEditDeck(await readDeck(deckId, abortController.signal));
      } catch (error) {
        console.log(error);
      }
    }
    deckId && editExistingDeck();
    return () => {
      abortController.abort();
    };
  }, []);

  async function EditDeck() {
    const abortController = new AbortController();
    return await updateDeck(editDeck, abortController.signal);
  }

  const handleChange = ({ target }) => {
    setEditDeck({
      ...editDeck,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    EditDeck().then(({ id }) => history.push(`/decks/${id}`));
    setEditDeck({ ...initialFormState });
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{editDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Create Deck</li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <DeckForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        deck={editDeck}
      />
    </>
  );
}

export default EditDeck;
