import React, {useEffect, useState} from 'react'
import {useRouteMatch, Link} from 'react-router-dom' 
import { createCard, readDeck } from '../../utils/api'
import CardForm from './CardForm'


function AddCard(){
    const {path, url, params} = useRouteMatch()
    const {deckId} = params
    const initialFormState = {
      front: "",
      back: "",
    };
    const [newCard, setNewCard] = useState({ ...initialFormState });
    const [deck, setDeck] = useState([])

    useEffect(() => {
        const abortController = new AbortController();
        async function viewDeck(){
            try{
                const response = await readDeck(deckId, abortController.signal)
                setDeck(response)
            }catch (error){
                console.log(error)
            }
        }
        deckId && viewDeck();
        return () => {
            abortController.abort();
        };
    }, [deckId])

    async function addNewCard() {
      const abortController = new AbortController();
      return await createCard(deckId, newCard, abortController.signal);
    }
  
    const handleChange = ({ target }) => {
      setNewCard({
        ...newCard,
        [target.name]: target.value,
      });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(newCard)
      addNewCard();
      setNewCard({ ...initialFormState });
    };
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active"> Add Card</li>
          </ol>
        </nav>
        <h1>{deck.name}: AddCard</h1>
        <CardForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          card={newCard} 
          deck={deck}
        />
      </>
    );
}


export default AddCard