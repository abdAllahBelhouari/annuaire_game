import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import BookmarksContext from '../BookmarksContext';

const Home= () => { 
    const {bookmarks, setBookmarks} = useContext ( BookmarksContext );

    // On utilise un state pour garder nos données
    const [games, setGames] = useState ([]);

    const [searchText, setSearchText] = useState('');
    
    const addBookmarks = ( game ) => { 
        const tmpBookmarks = [...bookmarks]; // On créé une copie de bookmarks
        const existe = tmpBookmarks.find(
            (bookmark) => bookmark.id === game.id
        ); 
        if ( existe ) {
            tmpBookmarks.splice (game); // On retire l'entrée     
        } else {
            tmpBookmarks.push (game); // On ajoute l'entrée 
        }
        
        setBookmarks (tmpBookmarks); // On met à jour le state avec le nouveau ttableau 
    } 

    const isBookmarked = (id) => {
        const exit = bookmarks.find(
            (bookmark) => bookmark.id === id
        );
        return exit ? true : false;
    }

    const handleSearch = (e) => { 
        e.preventDefault();

        const apiKey = '5b47284ebe9044dd987f8fcbd56c869f';
        fetch (`https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURI(searchText)}`)
        .then ( response => response.json() )
        .then ( data => { setGames (data.results)})
        .catch ( () => { alert ( 'Une erreur est survenue' ) })
    }
    
    return(
        <>
            <div className="sticky top-0 bg-[#f7dba0]/90 p-5 h-32">
                <div className="float-right">
                    <Link to={'/bookmarks'} className="bg-red-700 btn-menu" >
                        Mes Favoris 
                        <span className="bg-black rounded ml-2 px-2">{bookmarks.length}</span> 
                    </Link>
                    
                    <Link to={'/myshop'} className="bg-green-700 btn-menu mt-1" >
                        Magasins
                    </Link>
                </div>
                
                <form className="sm:w-full md:w-2/3 mx-auto flex text-2xl" onSubmit={handleSearch} >
                    <input 
                        type="text"
                        className="rounded-l border border-gray-500 flex-grow px-4 py-2"
                        autoFocus={true}
                        onInput={ e => { setSearchText(e.target.value) } }
                        value={searchText}
                        placeholder="Votre recherche"
                    />
                    <button type="submit"className="bg-blue-700 rounded-r text-white px-4 py-2">Rechercher</button>
                </form>
            </div>

            {/* Ajoutons notre liste */}
            <ul className="sm:w-full md:w-2/3 mx-auto px-2 text-2xl">
                {games.map(game => (
                    <li className="py-2 px-4 border-b border-gray-500 flex" key={game.id} >
                        <Link to={`/details/${game.slug}`} className="flex flex-grow">
                        <img src={game.background_image} alt="" className="w-24 pr-2"/>
                        <div className="text-2xl font-bold flex-grow">
                            {game.name}
                        </div>
                        <div>{game.rating}</div>
                        </Link>
                        <button onClick={() =>{addBookmarks(game)}} >{ isBookmarked(game.id) ? '★' : '☆' }</button>
                    </li>
                ))}
            </ul>
        </>
        );
    }
            
export default Home;