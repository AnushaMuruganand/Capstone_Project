import React from "react";
import { Helmet } from "react-helmet";

import WeatherSearch from "./WeatherSearch";

/** Show page either to sign up or log in or search for weather.
 *
 * Allows user to sign up or login if signed up or search for weather of a particular location
 *
 * Weather -> WeatherSearch
 *
 */

function Weather() {
    
    return (
        <div className="Weather">
            <Helmet bodyAttributes={{style: 'background-color : aliceblue'}}/>
            <div>
                <WeatherSearch/>
            </div>
        </div>
            
    );
}

export default Weather;
