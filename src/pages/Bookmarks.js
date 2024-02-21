import React, { useContext } from"react";
import BookmarksContext from "../BookmarksContext";
import { Link } from "react-router-dom";

const Bookmarks = ( ) => { 
    
    const {bookmarks, setBookmarks} = useContext ( BookmarksContext );
   
    const deleteBookmarks = ( index ) => { 
        const tmpBookmarks = [...bookmarks]; // On créé une copie de bookmarks 
        tmpBookmarks.splice (index, 1 ); // On supprime 1 entrée à partir de l'index 
        setBookmarks (tmpBookmarks); // On met à jour le state avec le nouveau ttableau 
    } 

    return (
    <>
        <h1 className="px-4 py-4">
            Mes favoris  
            <Link to={'/home'} className="bg-blue-700 rounded text-white px-4 py-1 mx-7" >Retour</Link>
        </h1>
        <hr></hr>
        <ul className="sm:w-full md:w-2/3 mx-auto px-2 text-2xl" >
            {bookmarks.map((bookmark, index) => (    
                <li className="py-2 px-4 border-b border-gray-500 flex" key={bookmark.id} >
                   <Link to={`/details/${bookmark.slug}`} className="flex flex-grow">
                        <img src={bookmark.background_image} alt="" className="w-24 pr-2"/>
                        <div className="text-2xl font-bold flex-grow">
                            {bookmark.name}
                        </div>
                    </Link> 
                    <button onClick={() =>{deleteBookmarks(index)}} >🗑️</button>
                </li>
            ))}
        </ul>         
    </> 
    )
} 

export default Bookmarks ;