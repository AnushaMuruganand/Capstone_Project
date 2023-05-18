"use strict";

/** Routes for weather. */

const Weather = require("../models/weather");
const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { ensureCorrectUser } = require("../middleware/auth");

/** GET /weather/ 
 *
 * Returns top 5 list of location recently searched by user from the database 
 */
router.get("/", async function (req, res, next) {
    try {
        const locationList = await Weather.getRecentLocation();

        return res.json({ locationList });

    } catch (err) {
        return next(err);
    }
})

/** GET /weather/auto  {city name}=>{autosuggest list of city names}
 *
 * Returns autosuggest list of cities as user types in search bar
 */
router.get("/auto", async function (req, res, next) {
    try {

        const { searchTerm } = req.query;
        const list = await Weather.getAutoSuggestList(searchTerm);
        return res.json({ list });

    } catch (err) {
        return next(err);
    }
})

/** GET /weather/current:  {city name}=>{weather details}
 *
 * Returns weather details for a particular city
 */
router.get("/current", async function (req, res, next) {
    try {

        const { lat, lng } = req.query;
        const currentWeather = await Weather.getCurrentWeather(lat, lng);
        return res.json({ currentWeather });

    } catch (err) {
        return next(err);
    }
})

/** POST /weather/current:  { cityName, region, country } => { weather_recents }
 *
 * Saves the cityName and country to the database table "weather_recents"
 */
router.post("/current", async function (req, res, next) {
    try {

        const { city, region, country } = req.body;
        const result = await Weather.saveLocation(city, region, country);
        return res.json({result});;

    } catch (err) {
        return next(err);
    }
    
})

/** GET /weather/forecast:  {city name}=>{weather details}
 *
 * Returns complete weather details for a particular city
 */
router.get("/forecast", async function (req, res, next) {
    try {
        const { cityName } = req.query;
        const weeklyWeather = await Weather.getWeeklyWeather(cityName);
        return res.json({ weeklyWeather });
    } catch (err) {
        return next(err);
    }
})
  
 /** GET /weather/[username] => { user }
 *
 * Returns { username, firstName, lastName } 
 *
 * Authorization required: same user-as-:username
 **/
  
router.get("/:username", ensureCorrectUser, async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

 /** POST /user/[username] => { user_id,city,region,country } => {weather_reports}
 *
 * Saves the cityName, region and country to the database table "weather_reports"
 * 
 * Authorization required: same user-as-:username
 * 
 **/
  
router.post("/user/:username", ensureCorrectUser, async function (req, res, next) {
    try {
        const { city, region, country } = req.body;
        const username = req.params.username;

        const result = await Weather.saveUserWeatherLocation(city, region, country, username);

        return res.json({result});
    } catch (err) {
        return next(err);
    }
});

/** GET user/[username] => { city,region,country }
 *
 * Returns the cityName, region and country from the database table "weather_reports"
 * 
 * Authorization required: same user-as-:username
 * 
 **/
  
router.get("/user/:username", ensureCorrectUser, async function (req, res, next) {
    try {
        const username = req.params.username;
        const userLocationList = await Weather.getUserWeatherLocations(username);

        return res.json({ userLocationList });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;