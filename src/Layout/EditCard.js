import React from "react";
import {useRouteMatch} from 'react-router-dom'

function EditCard(){
    const {path, url, params} = useRouteMatch();
    const {deckId, cardId} = params
    return(
        <>
            <h1>EditCard</h1>
        </>
    )
}

export default EditCard