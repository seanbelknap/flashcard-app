import React from 'react'
import {useRouteMatch} from 'react-router-dom' 


function AddCard(){
    const {path, url, params} = useRouteMatch()
    const {deckId} = params
    return(
        <>
            <h1>AddCard {deckId}</h1>
        </>
    )
}


export default AddCard