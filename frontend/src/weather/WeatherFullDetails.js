import React from "react";
import "./WeatherFullDetails.css";

import WeatherSun from "./WeatherSun";
import WeatherAlert from "./WeatherAlert";
import WeatherHourly from "./WeatherHourly";
import WeatherForecast from "./WeatherForecast";
import { useHistory } from "react-router-dom";

/** Show full weather information about a location user searched.
 *
 * Is rendered by WeatherCard to show a full weather details for location searched by user and when the weather card is clicked.
 *
 * WeatherCard -> WeatherFullDetails
 */

function WeatherFullDetails({ weatherDetails, degree }) {

    const history = useHistory();
    let hourly = weatherDetails.forecast.forecastday[0].hour;
    let forecast = weatherDetails.forecast.forecastday;
    const sunriseTime = weatherDetails.forecast.forecastday[0].astro.sunrise;
    const sunsetTime = weatherDetails.forecast.forecastday[0].astro.sunset;
    const alerts = weatherDetails.alerts.alert;
    
    const weatherCondition = weatherDetails.current.condition.text.toLowerCase();
    
    let bgImage;
    let textColor;

    if (weatherCondition === "sunny") {
        bgImage = "https://media.istockphoto.com/id/1007768414/photo/blue-sky-with-bright-sun-and-clouds.jpg?s=612x612&w=0&k=20&c=MGd2-v42lNF7Ie6TtsYoKnohdCfOPFSPQt5XOz4uOy4="
        textColor = "black";

    }
    else if(weatherCondition === "clear"){
        bgImage = "https://images.pond5.com/mostly-clear-type-weather-conditions-footage-086933258_prevstill.jpeg";
        textColor = "white";
    }
    else if(weatherCondition.includes("cloudy") || weatherCondition === "overcast"){
        bgImage = "https://www.rochesterfirst.com/wp-content/uploads/sites/66/2021/04/sky-1107579_1920.jpg";
        textColor = "white";
    }
    else if(weatherCondition.includes("mist") || weatherCondition.includes("fog")){
        bgImage = "https://i.gifer.com/7Jy7.gif";
        textColor = "black";
    }
    else if(weatherCondition.includes("rain") | weatherCondition.includes("drizzle")){
        bgImage = "https://media.tenor.com/9-Iy9g6zIW0AAAAC/rain.gif";
        textColor = "white";
    }
    else if(weatherCondition.includes("snow") || weatherCondition.includes("sleet") || weatherCondition.includes("blizzard")){
        bgImage = "https://i.pinimg.com/originals/5c/a4/f9/5ca4f9770c06a62d5e1be3736b2540d6.gif";
        textColor = "black";
    }

    function push() {
        history.push("/weather/search");
    }

    function displayCelciusCard() {
        return (
            <>
                <h2>{Math.round(weatherDetails.current.temp_c)}°C</h2>
                {weatherDetails.current.condition.text}
                <p>
                    <b>H:</b>
                    {Math.round(weatherDetails.forecast.forecastday[0].day.maxtemp_c)}°C
                    &nbsp;&nbsp;
                    <b>L:</b>
                    {Math.round(weatherDetails.forecast.forecastday[0].day.mintemp_c)}°C
                </p>
            </>
        );
    }

    function displayFarenheitCard() {
        return (
            <>
                <h2>{Math.round(weatherDetails.current.temp_f)}°F</h2>
                {weatherDetails.current.condition.text}
                <p>
                    <b>H:</b>
                    {Math.round(weatherDetails.forecast.forecastday[0].day.maxtemp_f)}°F
                    &nbsp;&nbsp;
                    <b>L:</b>
                    {Math.round(weatherDetails.forecast.forecastday[0].day.mintemp_f)}°F
                </p>
            </>
        );
    }

    return (
        <div className="WeatherDetail card text-center" style={{
            backgroundImage: `url(${bgImage})`, backgroundSize:"cover", color:`${textColor}`}}>
            <div className="WeatherDetail_Body card-body">
                <h3 className="card-title">{weatherDetails.location}</h3>
                {degree === "celcius" ?
                        displayCelciusCard()
                        : displayFarenheitCard()
                }

                {/* Sunrise And sunset Time */}
                <WeatherSun sunriseTime={sunriseTime} sunsetTime={sunsetTime} />

                {/* Alerts if any */}
                {(alerts.length !== 0)
                    ? <WeatherAlert alerts={alerts} />
                    : ""
                }

                <br />

                {/* Hourly weather report for the current day */}
                <WeatherHourly hourly={hourly} degree={degree} />

                {/* Forecast weather for a week */}
                <WeatherForecast forecast={forecast} degree={degree} />
            
            </div>
            <br/>
            <div>
                <button onClick={push} className="Weather-Back-Button">Go Back</button>
            </div>
            <br/>
        </div>
    );

}

export default WeatherFullDetails;
