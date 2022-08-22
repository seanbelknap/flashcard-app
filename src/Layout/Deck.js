import React from "react";
import { useRouteMatch } from "react-router-dom";

export default function Deck() {
    const {path, url, params} = useRouteMatch()
    const {deckId} = params
    return (
        <h2>This is Deck {deckId}</h2>
    )
}