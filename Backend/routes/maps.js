"use strict";

/** Routes for maps. */

const Map = require("../models/map");
const express = require("express");
const router = new express.Router();

/** GET /maps/
 *
 * Returns top 5 list of addresses recently searched by user from the database 
 */
router.get("/", async function (req, res, next) {
    try {
        const addressList = await Map.getRecentAddress();

        return res.json({ addressList });

    } catch (err) {
        return next(err);
    }
})

/** GET /maps/auto:  
 *
 * Returns autosuggest list of addresses as user types in search bar
 */
router.get("/auto", async function (req, res, next) {
    try {
    
        const searchName = req.query.searchTerm;
        const currentCoords = req.query.currentCoords;

        const searchList = await Map.getAutoSuggestList(searchName, currentCoords);

        const addressList = searchList
            .filter((list) => list.__type === "Address")
            .map((address) => {
                return address.address.formattedAddress;
            });

        return res.json({ addressList });

    } catch (err) {
        return next(err);
    }
})

/** GET /maps/location:  { address } => { Coords }
 *
 * Returns coordinates of the address specified
 */
router.get("/location", async function (req, res, next) {
    try {

        const { countryRegion, locality, postalCode, addressLine } = req.query;

        // Getting the lat, lng of the address
        const [lat, lng] = await Map.getCoordsByAddress(countryRegion, locality, postalCode, addressLine);
        
        return res.json({ lat,lng });

    } catch (err) {
        return next(err);
    }
});

/** POST /maps/location:  { address } => { location_recents }
 *
 * Saves the address to the database table "location_recents"
 */
router.post("/location", async function (req, res, next) {
    try {

        const { address } = req.body;
        await Map.saveAddress(address);

    } catch (err) {
        return next(err);
    }
    
})

/** GET /maps/restaurants:  { coordinates } => { list }
 *
 * Returns list of restaurants nearby the current location
 */
router.get("/restaurants", async function (req, res, next) {
    try {

        const { lat, lng } = req.query;

        const restaurants = await Map.getRestaurants(lat, lng);

        return res.json({ restaurants });

    } catch (err) {
        return next(err);
    }
});

module.exports = router;