import React from "react";
import "./WeatherFullDetails.css";

/** Component rendered from <WeatherFullDetails>.
 *
 * Shows 3-day weather forecast of a particular location
 *
 */

function WeatherForecast({ forecast }) {

    // Function to get the day of the week for the date
    function dateDay(date) {
        const d = new Date(date);
        const weekDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        let day = d.getDay();

        if (day === 6) return weekDay[0];
        else return weekDay[day + 1];
    }
    
    return (
        <div className="WeatherDetail_Forecast">
            <div style={{ textAlign: "left", marginLeft: "10px" }}>
                <b>3-Day Forecast</b>
            </div>
            {forecast.map((days, i) => {
                        
                const day = dateDay(days.date);
                const maxTemp = Math.round(days.day.maxtemp_c);
                const minTemp = Math.round(days.day.mintemp_c);
                const weatherIcon = days.day.condition.icon;
   
                return (
                    <div className="WeatherDetail_forecast_EachDiv" key={i} style={{ fontSize: "15px" }}>
                        <b>
                            {day}
                            &nbsp;&nbsp;
                            <img alt="" style={{ width: "25px", height: "25px" }} src={weatherIcon} />
                            &nbsp;&nbsp;      
                            <b>L:</b>
                            {minTemp}°C
                            &nbsp;&nbsp;
                            <b>H:</b>
                            {maxTemp}°C
                        </b>
                    </div>
                );
            })}
        </div>
    );
}

export default WeatherForecast;