import React, { useState, useContext, useEffect } from "react";
import "./WeatherSearch.css";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

import MapAndWeatherApi from "../api/api";
import SearchFormWeather from "../common/SearchFormWeather";
import WeatherCard from "./WeatherCard";
import WeatherFullDetails from "./WeatherFullDetails";
import UserContext from "../auth/UserContext";
import WeatherDegreeToggle from "./WeatherDegreeToggle";

/** Show page with the weather, search bar.
 *
 * loads weather.
 * Re-loads weather on submit from search form.
 *
 * WeatherSearch -> WeatherFullDetails/WeatherCard/SearchFormWeather
 *
 * This is routed to at /weather/auto when typed in search bar
 */

function WeatherSearch() {

    const { currentUser } = useContext(UserContext);

    const [weatherDetails, setWeatherDetails] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [userWeatherDetails, setUserWeatherDetails] = useState([]);
    const [degree, setDegree] = useState("celcius");
    
    useEffect(() => {
        if(currentUser) getUserWeather();  
    }, [currentUser]);
    
    async function getUserWeather() {
        
        const lists = await MapAndWeatherApi.getUserWeatherDetails(currentUser.username);

        let data = await Promise.all(lists.map(async (list) => {

            let result = await MapAndWeatherApi.getForecastWeatherDetails(list.city);

            return ({
                location: result.location.name,
                currentTime: result.location.localtime.split(" ")[1],
                current: result.current,
                alerts: result.alerts,
                forecast: result.forecast
            });
        }));

        setUserWeatherDetails(data);
        return true;
    }

    async function saveUserWeather(searchLocation) {
        const result = await MapAndWeatherApi.saveUserWeatherDetails(searchLocation, currentUser.username);
        return result;
    }

    async function search(searchTerm) {
        const result = await MapAndWeatherApi.getForecastWeatherDetails(searchTerm.split(",", 1));

        setWeatherDetails({
            location: result.location.name,
            currentTime: result.location.localtime.split(" ")[1],
            current: result.current,
            alerts: result.alerts,
            forecast: result.forecast
        });

        if (currentUser) {
            await saveUserWeather(searchTerm);
            await getUserWeather();
        }

        await MapAndWeatherApi.saveWeatherLocation(searchTerm);
    }

    function showFullDetails(weatherDetail){
        setClicked(true);
        setWeatherDetails(weatherDetail);
    }

    function showSlides() {
        return (
            <AliceCarousel autoPlay infinite disableDotsControls
                disableButtonsControls autoPlayInterval={1000}>
                <img src="https://i.gifer.com/3c2.gif" className="sliderimg" alt="" />
                <img src="https://thumbs.gfycat.com/ShabbyRipeAmericangoldfinch-size_restricted.gif" className="sliderimg" alt="" />
                <img src="https://thumbs.gfycat.com/DenseEvilDoctorfish-max-1mb.gif" className="sliderimg" alt="" />
                <img src="https://media.tenor.com/ZAw_hz_GBBsAAAAd/rain.gif" className="sliderimg" alt="" />
                <img src="https://cdn.pixabay.com/animation/2022/10/15/08/31/08-31-54-368_512.gif" className="sliderimg" alt="" />
            </AliceCarousel>
        );
    }

    function weatherDegree(degree) {
        setDegree(degree);
    }

    if (currentUser) {
        if (clicked) {
            return (
                <div className="container mt-5">
                    <div className="degreeToggle">
                        Toggle between CELCIUS and FARENHEIT DEGREE
                        <br /><br />
                            
                        <WeatherDegreeToggle weatherDegree={weatherDegree} />
                    </div>
                    <br/>
                    <WeatherFullDetails weatherDetails={weatherDetails} degree={degree} />
                </div>
            );
        }
        else {
            return (
                <div className="WeatherSearch container">
            
                    <div>
                        <SearchFormWeather searchFor={search} />
                    </div>

                    <div  style={{ marginTop: "11em"}}>
                        <div className="degreeToggle">
                            Toggle between CELCIUS and FARENHEIT DEGREE
                            <br /><br />
                            
                            <WeatherDegreeToggle weatherDegree={weatherDegree} />
                        </div>
                        <br/>
                        <div className="UserWeather">
                            {userWeatherDetails.map(weatherDetail => (
                                <WeatherCard weatherDetails={weatherDetail} showFullDetails={showFullDetails} degree={degree} />
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
    }

    else {
        if (clicked) {
            return (
                <div className="container mt-5">
                    <WeatherFullDetails weatherDetails={weatherDetails} />
                </div>
            )
        }
        else {
            return (
                <div className="WeatherSearch container">
            
                    <div>
                        <SearchFormWeather searchFor={search} />
                    </div>
                
                    <div style={{marginTop:"11em"}}>
                        {weatherDetails ?
                            <>
                                <div>
                                    <WeatherDegreeToggle weatherDegree={weatherDegree} />
                                </div>
                                <WeatherCard weatherDetails={weatherDetails} showFullDetails={showFullDetails} degree={degree} />
                            </>
                            : showSlides()
                        }
                    </div>
                </div>
            );
        }
    }
}

export default WeatherSearch;