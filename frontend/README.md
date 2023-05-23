# Map and Weather App

This is my Capstone project for UMASS Global Software Engineering Bootcamp. This app provides an easy place to look up **Weather** of any location and addresses/calculate routes/restaurants on **Map**.

## Deployed Site

Click here -> [Map and Weather App](https://map-and-weather.onrender.com)

## APIs used

This app makes heavy use of the 3 API's:
   - **Bing Map API** -> https://learn.microsoft.com/en-us/bingmaps/rest-services/
   - **Yelp API** for Restaurants -> https://docs.developer.yelp.com/docs/fusion-intro
   - **Weather API** -> https://www.weatherapi.com/docs/
  
## Tools and Libraries

   - [React](https://react.dev/): A JavaScript library for building user interfaces.
   - [React-Bootstrap](https://react-bootstrap.github.io/): A library for using Bootstrap with React.
   - [React Router](https://reactrouter.com/en/main): A collection of navigational components for building single-page applications with React.
   - [Axios](https://axios-http.com/): A promise-based HTTP client for the browser and Node.js.
   - [JWT-Decode](https://github.com/auth0/jwt-decode): A library for decoding JSON Web Tokens.
   - [Font Awesome](https://fontawesome.com/): A popular icon library and toolkit.
  
## User Flow

Users can navigate through **Map** pages and **Weather** pages without creating a User Account. However creating a User Account for **Weather** will allow users to look for previously searched location for quick reference. A user can look for Addresses/nearby Restaurants/Calculate Routes on **Map** and look for Locations/Signup/Login on **Weather**.

  ### Map
   - This page allows User to search for addresses and Map locates that address.
   - User can look for nearby Restaurants and can change the view of the Map to look for restaurants on that location by clicking on the Restaurant button.
   - User can calculate Routes by specifying the from and to destination by clicking on the Directions button.
   - User can view the current date's Weather based on the user's location.
   - On the Restaurants page, User can hover on the restaurant pushin to view restaurant details as a pop up window

  ### Weather
   - This page allows User to look for weather of a particular location.
   - User can also create an account, so User can view the weather of all previously searched locations for quick access.
   - Can toggle between Celcius and Fahrenheit Degree for viewing weather.
   - User can click on weather card displayed for each searched locations, so Udser can view the complete weather details such as Sunrise/Sunset time, Hourly forecast, Max and Min Temperature, 3-Day Forecast.

## Features Implemented
    *This page includes a dynamic styling like Carousel
    *Pop up window appears when hovered on restaurant pushpin
    *Log in, log out auth
    *Based on Weather condition of a particular location the weather card's background changes accordingly

## Getting Started with Create React App

This project was bootstrapped with Create React App.

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

