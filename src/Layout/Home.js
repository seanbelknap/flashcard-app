import React from "react";
import {Link} from 'react-router-dom'
function Home(){
    return (
        <>
         <h1>Home</h1>
         <Link className='btn btn-secondary' to='/decks/new'>Create Deck</Link>
        </>
    
    )
}

export default Home