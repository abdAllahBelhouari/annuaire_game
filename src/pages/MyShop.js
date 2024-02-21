import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import haversine from '../haversine';

const MyShop = () => {
    
    const [shops, setShops] = useState ([]);

    const [lePlusProche, setlePlusProche] = useState ({});

    useEffect ( ()=> {
        navigator.geolocation.getCurrentPosition((position) => {
            localiser(position.coords.latitude, position.coords.longitude);
        })
    }, [])

    const localiser = (gps_lat, gps_lng)=> {
        let min = 10000000;

        fetch   (`https://formacitron.github.io/shopslist/shops.json`)
        .then   ( response => response.json() )
        .then   ( data => { 
                            setShops (data.results);
                            data.forEach(element => {
                                let a = [element['gps_lat'], gps_lat];
                                let b = [element['gps_lng'], gps_lng];

                                if ( haversine (a, b) < min ) {
                                    min = haversine (a, b);
                                    setlePlusProche(element);
                                    console.log(element);
                                }
                            });
                        })
        .catch  ( () => { alert ( 'Une erreur est survenue' ) })
    }

    return(
        <>
            <h1 className="px-4 py-4">
                Magasin le plus proche
                <Link to={'/home'} className="bg-blue-700 rounded text-white px-4 py-1 mx-7" >Retour</Link>
            </h1>
            <hr></hr>
            <div>{lePlusProche.name}</div>
            <div>{lePlusProche.zip_code} {lePlusProche.city}</div>
            <div>{lePlusProche.id}</div>
        </>
    )
}
export default MyShop;