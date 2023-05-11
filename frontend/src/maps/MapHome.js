import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./MapHome.css";
import { Helmet } from "react-helmet";

import Map from "./Map";

/** Show Home page for the Map.
 *
 * when clicked the search button loads map
 *
 * MapHome -> Map
 *
 */
   
function MapHome() {
    
    const history = useHistory();
    const [clicked, setClicked] = useState(false);
    function map() {
        setClicked(true);
        history.push("/maps/search");
    }

    if (clicked) {
        return (
            <div>
                <Map />
            </div>
        );
    }
    else {
        return (
            <div className="MapHome">
                <Helmet bodyAttributes={{style: 'background : url("https://c8.alamy.com/comp/2J0P44D/world-map-with-camera-toy-plane-starfish-high-quality-and-resolution-beautiful-photo-concept-2J0P44D.jpg"); background-size: cover'}}/>
                <div className="container text-center">
                    <h1 className="MapHome-title mb-4 font-weight-bold">Welcome to Maps</h1>
                    <p className="sub">Start looking for locations, restaurants on MAP ... ENJOY!!!!!!</p>
                    <button className="MapHome-button" onClick={map}>Start Search</button>
                </div>
            </div>
        );
    }
}

export default MapHome;