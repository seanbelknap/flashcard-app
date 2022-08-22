import React from "react";
import {useRouteMatch} from 'react-router-dom'


function EditDeck(){
    const {path, url, params} = useRouteMatch();
    const {deckId} = params

    return (
        <>
            <h1>EditDeck {deckId}</h1>
        </>
    )
}



export default EditDeck;