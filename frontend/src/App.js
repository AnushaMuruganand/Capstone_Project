import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import './App.css';
import jwt from "jsonwebtoken";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import useGeolocation from "./hooks/useGeolocation";
import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes";
import MapAndWeatherApi from "./api/api";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./auth/UserContext";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "weather-token";
export const CURRENT_COORD = "current-coord"

/** Map and Weather application.
 *
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 * App -> Routes
 */

function App() {

  library.add(fas);

  const coord = useGeolocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  
  const [currentCoord, setCurrentCoord] = useLocalStorage(CURRENT_COORD, coord);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {

          // "jwt.decode()" returns the payload of that "token" passed in, from that we destructure just the username alone
          let { username } = jwt.decode(token);

          // put the token on the Api class so it can use it to call the API.
          MapAndWeatherApi.token = token;

          let currentUser = await MapAndWeatherApi.getCurrentUser(username);

          setCurrentUser(currentUser);

        }catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
    }

    async function getCurrentCoord() {
      if (coord) {
        setCurrentCoord(coord);
      }
    }

    async function getCurrentWeather() {
      const result = await MapAndWeatherApi.getCurrentWeatherDetails(currentCoord.lat, currentCoord.lng);

      setCurrentWeather({
        current: result.current
      });
    }
    
    getCurrentCoord();
    getCurrentUser();
    getCurrentWeather();

  }, [token, coord, currentCoord]);

  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function and check its return value!
   */
  async function signup(signupData) {
    try {

      let token = await MapAndWeatherApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login.
   *
   * Make sure you await this function and check its return value!
   */
  async function login(loginData) {
    try {
      let token = await MapAndWeatherApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, currentCoord, login, signup, currentWeather}}>
        <div className="App">
          <Navigation logout={logout} />
          <Routes coords={coord} login={login} signup={signup} />
        </div>
      </UserContext.Provider>   
    </BrowserRouter>
  );
}

export default App;
