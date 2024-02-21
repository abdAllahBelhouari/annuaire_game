import './App.css';
import Home from './pages/Home';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import BookmarksContext from './BookmarksContext';
import MyShop from './pages/MyShop';

import { createBrowserRouter,RouterProvider}from'react-router-dom';
import ErrorMessage from'./pages/ErrorMessage';
import Details from'./pages/Details';
import Bookmarks from './pages/Bookmarks';

function App() {
  const [bookmarks, setBookmarks] = useState([]);

  // Création du routeur
  const router =createBrowserRouter([ 
    {
      path:"/",
      element:<Home/>,
      errorElement:<ErrorMessage/>, 
    }, 
    {
      basename: "/annuaire_games"
    },
    {
      path:"/details/:slug",
      element:<Details/>, 
    },  
    {
      path:"/bookmarks",
      element:<Bookmarks/>, 
    },  
    {
      path:"/home",
      element:<Home/>, 
    },
    {
      path:"/myshop",
      element:<MyShop/>, 
    }, 
  ], {basename:"/"})

  const [dataLoaded, setDataLoaded] = useState(false);
  
  useEffect ( ()=> {
    if ( dataLoaded ) {
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  }, [bookmarks])

  useEffect( ()=> {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || "[]");
    setBookmarks(savedBookmarks);
    setDataLoaded(true);
  }, [])

  const deferredPrompt = useRef(null);

  useEffect ( ()=> {
    const handler = (e)=> {
      e.preventDefault();
      deferredPrompt.current = e;
      console.log('Change prompt ', deferredPrompt);
      setInstall(true);
    };

    window.addEventListener('beforeinstallprompt',handler);
    
    return () => {
      window.removeEventListener('beforeinstallprompt',handler);
    };
  }, []);
  

  const [install, setInstall] = useState(false);
  
  const handleInstall = () => {
    deferredPrompt.current.prompt();
    deferredPrompt.current.userChoice.then((choiceResult) => {
      if ( choiceResult.outcome === 'accepted' ) {
        alert("Merci pour l'installation");
      } else {
        alert("Installation refusée par l'utilisateur !");
      }
      deferredPrompt.current = null;
    });
    setInstall(false);
  }

  return (
    <BookmarksContext.Provider value={{bookmarks, setBookmarks}}>
      {install && (
        <div className='bg-gray-300 shadow-grey-700 p-4 flex items-center' >
          <div className='flex-grow text-center' >
            Voulez-vous installer l'application sur votre appareil ? 
          </div>
          <button className='px-4 py-2 rounded text-white bg-teal-600' onClick={handleInstall}>Installer</button>
        </div>
      )}
      <RouterProvider router={router}></RouterProvider>
    </BookmarksContext.Provider>
  );  
}

export default App;
