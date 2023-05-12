import React from "react";
import "./WeatherFullDetails.css";

/** Component rendered from <WeatherFullDetails>.
 *
 * Shows hourly weather of the current data of the particular location 
 *
 */

function WeatherHourly({ hourly, degree }) {

    // Function to display time as a 12 hour format
    function dateTime(hour){
        let ap = hour >= 12 ? 'pm' : 'am';
        hour = hour % 12;
        hour = hour ? hour : 12;
        let mergeTime = hour + " " + ap;
        return mergeTime;
    }

    return (
        <div className="WeatherDetail_Hours">
            <div style={{ textAlign: "left", marginLeft: "10px" }}>
                <b>Hourly Forecast</b>
            </div>
            {hourly.map((hours, i) => {
                const time = hours.time.split(" ")[1].split(":")[0];
                       
                const hour = dateTime(time);
                const weatherIcon = hours.condition.icon;

                let temp;
                if (degree === "celcius") {
                    temp = `${Math.round(hours.temp_c)}°C`;
                }
                else {
                    temp = `${Math.round(hours.temp_f)}°F`;
                }
                
                return (
                    <div className="WeatherDetail_Hours_EachDiv" key={i} style={{ fontSize: "15px" }}>
                        <b>
                            {hour}
                            <img alt="" style={{ width: "35px", height: "35px" }} src={weatherIcon} />
                            <br />
                            {temp}
                        </b>
                    </div>
                );
            })}
        </div>
    );
}

export default WeatherHourly;