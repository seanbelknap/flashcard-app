import React, {useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Study from "./Study/Study";
import Deck from "./Deck";
import CreateDeck from "./CreateDeck";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import { Route, Switch } from "react-router-dom";
import { listDecks } from "../utils/api/index";


function Layout() {

  const [decks, setDecks] = useState([]);

 useEffect(() => {
    async function getAllDecks() {
      const abortController = new AbortController();
      const decks = await listDecks(abortController.signal);
      setDecks(decks);
    }
      getAllDecks();
  },[]);
  

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact={true} path={'/'}>
            <Home decks={decks} />
          </Route>
          <Route path={'/decks/new'}>
            <CreateDeck />
          </Route>
          <Route path={'/decks/:deckId/edit'}>
            <EditDeck />
          </Route>
          <Route path={'/decks/:deckId/cards/new'}>
            <AddCard />
          </Route>
          <Route path={'/decks/:deckId/cards/:cardId/edit'}>
            <EditCard />
          </Route>
          <Route path={'/decks/:deckId/study'}>
            <Study />
          </Route>
          <Route path={'/decks/:deckId'}>
            <Deck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;