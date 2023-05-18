import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Map.css";

import MapAndWeatherApi from "../api/api";
import MapView from "./MapView";
import SearchFormMap from "../common/SearchFormMap";
import MapInputPanel from "./MapInputPanel";
import UserContext from "../auth/UserContext";
import Restaurants from "./Restaurants";

/** Show page with the map, search bar.
 *
 * loads map.
 * Re-loads map on submit from search form.
 *
 * Map -> MapView
 *
 * This is routed to at /maps/auto when typed in search bar
 */
   
function Map() {
    
    const history = useHistory();
    const { currentCoord, currentWeather } = useContext(UserContext);
    const [mapCoords, setMapCoords] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [restaurants, setRestaurants] = useState([]);

    async function search(searchTerm) {
        const coords = await MapAndWeatherApi.getMapCoords(searchTerm);
        setMapCoords(coords);

        await MapAndWeatherApi.saveMapAddress(searchTerm);
        
    }

    function getClick() {
        setClicked(true);
        history.push("/maps/search/routes");
    }

    // Function to display the current weather of the current location of the user
    function displayWeather() {
        return (
            <div className="Map_displayWeather">
                
                <div className="displayWeather" >
                    <img src={currentWeather.current.condition.icon} style={{ width: "70px", height: "70px" }} alt="" />
                    <br/>
                </div>
                
                <div className="displayWeather m-3" style={{fontSize:"15px"}}>
                    {Math.round(currentWeather.current.temp_c)}°C
                    <br/>
                    {currentWeather.current.condition.text}
                </div>
            </div>
        )
    }

    // Function to get the list of restaurants of the current location of the user from the api
    async function getRestaurants(lat,lng) {
        let results;

        if (lat && lng) {
            results = await MapAndWeatherApi.getRestaurants(lat, lng);
        }
        else {
            results = await MapAndWeatherApi.getRestaurants(currentCoord.lat, currentCoord.lng);
        }

        const list = results.map((result) => {
            return({
                name: result.name,
                image: result.image_url,
                coords: result.coordinates,
                price: result.price,
                rating:result.rating,
                category:result.categories[0].title
            });
        })

        setRestaurants([...list]);

        history.push("/maps/search/restaurants"); 
    }

    function push() {
        setRestaurants([]);
        history.push("/maps/search");
    }

    if (clicked) {
        return (
            <div>
                <MapInputPanel />
            </div>
        );
    }

    else if (restaurants.length !== 0) {
        return (
            <div className="Map">
                <div className="m-3">
                    <div style={{ textAlign: "left" }}>
                        <button className="buttons" onClick={getClick}>
                            <img src="https://cdn-icons-png.flaticon.com/128/565/565349.png" alt="" style={{ width: "50px", height: "50px" }} />
                            Directions
                        </button>
                        <br/><br/>
                        <button className="buttons" onClick={getRestaurants} >
                            <img src="https://cdn-icons-png.flaticon.com/512/3448/3448609.png" alt="" style={{ width: "50px", height: "50px" }} />
                            Restaurants
                        </button>
                    </div>
                    <br/><br/>
                    <div>
                        <button onClick={push} className="back-button">Go Back</button>
                    </div>
                    <div>
                        {currentWeather ?
                            displayWeather()
                            : ""
                        }
                        
                    </div>

                </div>
                <div>
                    <Restaurants restaurants={restaurants} getRestaurants={getRestaurants} />
                </div>
            </div>
        );
    }
        
    else  {
        return (
            <div className="Map">
            
                <div className="Map_Search m-3">
                    <SearchFormMap searchFor={search} currentCoords={currentCoord} />

                    <div className="Map-buttons" style={{ textAlign: "left" }}>
                        <button className="buttons" onClick={getClick}>
                            <img src="https://cdn-icons-png.flaticon.com/128/565/565349.png" alt="" style={{ width: "50px", height: "50px"}} />
                            Directions
                        </button>
                        <br/><br/>
                        <button className="buttons" onClick={getRestaurants} >
                            <img src="https://cdn-icons-png.flaticon.com/512/3448/3448609.png" alt="" style={{ width: "50px", height: "50px" }} />
                            Restaurants
                        </button>
                    </div>

                    <div>
                        {currentWeather?
                            displayWeather()
                            : ""
                        }     
                    </div>

                </div>
                
                <div>
                    {mapCoords ?
                        <MapView lat={mapCoords.lat} lng={mapCoords.lng} />
                        : <MapView lat={currentCoord.lat} lng={currentCoord.lng} />
                    }
                </div>
        
            </div>
        );
    }

}

export default Map;