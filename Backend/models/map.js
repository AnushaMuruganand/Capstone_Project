"use strict";

const BING_MAPS_KEY = "AmqtVAecbzoYK2CSsA5JCLhrcI3ia_2skrn2_KJkauiqDTAhuxJM13rQCKRl7Nkc";

const RESTAURANTS_KEY = "2p4nVay1WHj-FiBjW1epHpN1J6VSXHwnqEfKjvpUsDFoPYbt3RPX87XAdgb_ltdYuqXao7uQ0JgMr88itiFeXtyD3pnsRptz4yoeFDfq2Jg1aOyZcnh0RY29syEnZHYx" 

const db = require("../db");
const axios = require("axios");

/** Related functions for maps. */

class Map {

    // Function to get the latitude and longitude coordinates based on address 
    static async getCoordsByAddress(countryRegion, locality, postalCode, addressLine) {

        const result =
            await axios(`http://dev.virtualearth.net/REST/v1/Locations?   
                countryRegion=${countryRegion}&locality=${locality}&postalCode=${postalCode}&addressLine=${addressLine}&key=${BING_MAPS_KEY}`);

        return result.data.resourceSets[0].resources[0].geocodePoints[0].coordinates;

    }

    // Function to get autosuggest list as the user types in address in search bar
    static async getAutoSuggestList(searchName, currentLocationCoords) {
        const result = await axios(`http://dev.virtualearth.net/REST/v1/Autosuggest?query=${searchName}&userLocation=${currentLocationCoords.lat},${currentLocationCoords.lng},5&includeEntityTypes=Address,Place&key=${BING_MAPS_KEY}`)

        return result.data.resourceSets[0].resources[0].value;
    }

    // Function to save the address the user searched into the database table "location_recents"
    static async saveAddress(address) {
        // const preCheckAddress = await db.query(
        //     `SELECT address
        //     FROM location_recents
        //     WHERE address = $1`, [address]
        // );

        const preCheckAddress = await db.select("address").from("location_recents").where("address", `${address}`);

        const savedAddress = preCheckAddress[0];

        if (savedAddress.length!==0) {
            // const result = await db.query(
            //     `INSERT INTO location_recents
            //     (address) VALUES ($1)`, [address]
            // );

            const result = await db("location_recents").insert("address", `${address}`);
        }
    }

    // Function to get the list of recent addresses user searched from the database table "location_recents"
    static async getRecentAddress() {

        // const result = await db.query(
        //     `SELECT address
        //     FROM location_recents ORDER BY id DESC LIMIT 5`
        // );

        const result = await db.select("address").from("location_recents").orderBy("id", "desc").limit(5);

        console.log("get recent map :", result);

        const addresses = result;
    
        return addresses;
    }

    // Function to get the nearby restaurants of the currnt location of the user
    static async getRestaurants(lat, lng) {

        const headers = {Authorization: `Bearer ${RESTAURANTS_KEY}`}
        const result = await axios.get(
            `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lng}&term=restaurants&sort_by=best_match&limit=10`,
            {headers}
        );

        return result.data.businesses;
    }
}

module.exports = Map;