"use strict";

const WEATHER_API_KEY = "23cc65befbb94ae8a13222149230405";

const BASE_URL = "http://api.weatherapi.com/v1"

const db = require("../db");
const axios = require("axios");

/** Related functions for WEATHER. */

class Weather { 

    // Function to get the auto suggestion list of cities as user types in 
    static async getAutoSuggestList(searchName) {
        const result = await axios(`${BASE_URL}/search.json?key=${WEATHER_API_KEY}&q=${searchName}`)

        return result.data;
    }

    // Function to get the current weather of the current location or location user searched for
    static async getCurrentWeather(lat, lng) {
        const result = await axios(`${BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${lat},${lng}`);
        
        return result.data;
    }

    // Function to get the weekly weather forecast and also hourly weather for the current day
    static async getWeeklyWeather(cityName) {
        const result = await axios(`${BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${cityName}&days=7&aqi=yes&alerts=yes`);

        return result.data;
    }

    // Function to get the list of recent locations user searched from the database table "weather_recents"
    static async getRecentLocation() {

        const result = await db.query(
            `SELECT city,region,country
            FROM weather_recents ORDER BY id DESC LIMIT 5`
        );

        const locations = result.rows;
    
        return locations;
    }

    // Function to save the location the user searched into the database table "weather_recents"
    static async saveLocation(city,region,country) {
        const preCheckLocation = await db.query(
            `SELECT city,region,country
            FROM weather_recents
            WHERE city = $1 AND region=$2 AND country = $3`, [city, region, country]
        );

        const savedLocation = preCheckLocation.rows[0];

        if (!savedLocation) {
            const result = await db.query(
                `INSERT INTO weather_recents
                (city, region, country) VALUES ($1, $2, $3) RETURNING city`, [city, region, country]
            );
            return result.rows[0];
        }
        else return "FOUND RESULT";
    }

    // Function to save the location the user searched into the database table "weather_reports if logged in for that user"
    static async saveUserWeatherLocation(city, region, country, username) {

        const user = await db.query(
            `SELECT id FROM users
            WHERE username = $1`, [username]
        );

        const userID = user.rows[0].id;

        const preCheckLocation = await db.query(
            `SELECT city,region,country
            FROM weather_reports
            WHERE city = $1 AND region=$2 AND country = $3 AND user_id = $4`, [city, region, country, userID]
        );

        const savedLocation = preCheckLocation.rows[0];

        if (!savedLocation) {
            const result = await db.query(
                `INSERT INTO weather_reports
                (user_id, city, region, country) VALUES ($1, $2, $3, $4) RETURNING user_id, city`, [userID, city, region, country]
            );
            return result.rows[0];
        }
        else {
            return "ALREADY PRESENT";
        }   
    }

    // Function to get all the locations user serached for from the database "weather_reports" if logged in
    static async getUserWeatherLocations(username) {
        const user = await db.query(
            `SELECT id FROM users
            WHERE username = $1`, [username]
        );

        const userID = user.rows[0].id;

        const result = await db.query(
            `SELECT city,region,country
            FROM weather_reports 
            WHERE user_id = $1 ORDER BY id DESC`, [userID]
        );

        const locations = result.rows;

        return locations;
    }
}


module.exports = Weather;