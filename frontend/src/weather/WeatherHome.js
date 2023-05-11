import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import "./WeatherHome.css";

import { NavLink, useHistory } from "react-router-dom";
import Weather from "./Weather";
import WeatherLoginForm from "../auth/WeatherLoginForm";
import WeatherSignupForm from "../auth/WeatherSignUpForm";
import UserContext from "../auth/UserContext";

/** Show Home page for the Weather.
 *
 * when clicked the search button loads weather search form
 * Or login/signup button clicked, loads the login/signup form
 *
 * WeatherHome -> Weather/LoginForm/SignupForm
 *
 */
   
function WeatherHome() {
    
    const history = useHistory();
    const [clicked, setClicked] = useState(false);
    const [log, setLog] = useState(false);
    const [sign, setSign] = useState(false);
    const { login, signup, currentUser } = useContext(UserContext);

    function weather() {
        setClicked(true);
        history.push("/weather/search");
    }

    function userLogin() {
        setLog(true);
    }

    function userSignup() {
        setSign(true);
    }

    function displayButtons() {
        return (
            <>
                &nbsp;/&nbsp;
                <NavLink onClick={userSignup} className="WeatherHome-button" to="/weather/signup">
                    Sign Up
                </NavLink>
                &nbsp;/&nbsp;
                <NavLink onClick={userLogin} className="WeatherHome-button" to="/weather/login">
                    Login
                </NavLink>
            </>
        );
    }

    if (clicked) {
        return (
            <div>
                <Weather />
            </div>
        );
    }
    else if (log) {
        return (
            <div>
                <WeatherLoginForm login={login} />
            </div>
        );
    }
    else if (sign) {
        return (
            <div>
                <WeatherSignupForm signup={signup}/>
            </div>
        );
    }

    else {
        return (
            <div className="WeatherHome">
                <Helmet bodyAttributes={{style: 'background : url("https://thumbs.dreamstime.com/z/weather-forecast-concept-sunny-rainy-blue-background-top-view-161004742.jpg"); background-size:cover'}}/>
                <div className="container text-center">
                    <h1 className="WeatherHome-title mb-4 font-weight-bold">Welcome to Weather Report</h1>
                    <p className="sub">Start looking for Weather Report of any location</p>
                    {currentUser
                        ? ""
                        :
                        <p className="sub">CREATING AN ACCOUNT help you to add searched locations for quick access</p>
                    }
                    <button onClick={weather} className="WeatherHome-button">Start Search</button>
                    {currentUser
                        ? ""
                        :
                        displayButtons()  
                    }
                    
                </div>
            </div>
        );
    }
}

export default WeatherHome;