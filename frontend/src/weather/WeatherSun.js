import React from "react";
import "./WeatherFullDetails.css";

/** Component rendered from <WeatherFullDetails>.
 *
 * Shows sunrise and sunset time of the current date of a particular location user searched.
 *
 */

function WeatherSun({ sunriseTime, sunsetTime }) {
    return (
        <div className="WeatherDetail_Sun">
            <b>Sunrise :</b> {sunriseTime}
            &nbsp; &nbsp;
            <b>Sunset :</b>{sunsetTime}
        </div>
    );
}

export default WeatherSun;