import React, { useEffect } from "react";
import { Link } from "react-router-dom";


export default function Home({decks}) {

    function handleClick() {
       if (window.confirm("Delete this Card?\n\n You will not be able to recover it.")) {
        console.log("Delete")
       }
    }


    useEffect(() => {
    }, [decks])
    const content = decks.map((deck) => { 
        return (
            <div key={deck.id} className="card">
            <div className="card-body">
              <h5 className="card-title">{deck.name}</h5>
              <p className="card-text">{deck.description}</p>
              <Link to={`/decks/${deck.id}`} className="btn btn-secondary">View</Link>
              <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
              <button className="btn btn-danger" onClick={handleClick}>Delete</button>
            </div>
          </div>
        )    
    })


    return (
       <>
        <h1>This is Home</h1>
        <Link className="btn btn-secondary" to="/decks/new">Create Deck</Link>
        {content} 
       </>
    )
}