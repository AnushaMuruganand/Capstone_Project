# Map and Weather App

This is my Capstone project for UMASS Global Software Engineering Bootcamp. This app provides an easy place to look up **Weather** of any location and addresses/calculate routes/restaurants on **Map**.

## APIs used

This app makes heavy use of the 3 API's:
   - **Bing Map API** -> https://learn.microsoft.com/en-us/bingmaps/rest-services/
   - **Yelp API** for Restaurants -> https://docs.developer.yelp.com/docs/fusion-intro
   - **Weather API** -> https://www.weatherapi.com/docs/

## Tech stack used

The app is built using the following:

   - Node.js
   - Express
   - PostgreSQL

## Installation 💻

Use the package manager npm to install the app.

    git clone https://github.com/AnushaMuruganand/Capstone_Project.git   
 
    npm install
    
    node server.js

Open http://localhost:3001 to view it in your browser.

## Database

The app uses PostgreSQL as its database.

### Backend Routes

#### Auth
    POST /auth/token
    
This route takes username & password and returns a token. This route is used for logging in a user.

    POST /auth/register
    
Route for signing up a user. Required data includes username, password, firstName, lastName, email.

#### Map
    GET /maps/
 
Route will return top 5 list of addresses recently searched by user from the database
 
    GET /maps/auto
    
Route returns autosuggest list of addresses as user types in search bar

    GET /maps/location
   
Route returns coordinates of the address specified

    POST /maps/location
   
Route saves the address to the database

    GET /maps/restaurants
    
Route returns list of restaurants nearby the current location

#### Weather

    GET /weather/
    
Route returns top 5 list of location recently searched by user from the database

    GET /weather/auto
   
Route returns autosuggest list of cities as user types in search bar

    GET /weather/current
    
Route returns weather details for a particular location

    POST /weather/current
    
 Route saves location to the database
 
    GET /weather/forecast
    
 Route returns the  complete weather details for a particular location
 
    GET /weather/:username
    
 Route returns the username, firstName, lastName of the user and also makes sute user is logged in
 
    POST /weather/user/:username
    
 Route saves the location details(city name, region, country) to the database and also ensures that user is logged in
 
    GET /weather/user/:username
  
Route returns the location details(city name, region, country) from the database and also ensures User is logged in 
 

## Contributing

Contributions are welcome! Please follow the [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow) when making contributions.

