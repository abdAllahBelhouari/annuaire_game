import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

const Details= () => {
    const {slug} = useParams();

    const [game, setGame] = useState ({name:"titre", description_raw:""});

    useEffect (() => {
        const apiKey = '5b47284ebe9044dd987f8fcbd56c869f';
        
        const url = `https://api.rawg.io/api/games/${slug}?key=${apiKey}`;
        fetch (url)
            .then ( response => response.json() )
            .then ( data => { setGame(data) })
            .catch ( () => { alert ( 'Une erreur est survenue' ) })
    }, [slug]);
    

    return(
        <>
            <h1>{game.name}</h1>
            <hr></hr>
            <img src={game.background_image} alt=""/>
            <h2>Description</h2>
            <div dangerouslySetInnerHTML={{ __html: game.description_raw.replace(new RegExp('\r?\n','g'), '<br />')}}></div>
        </>
    )
}
export default Details
