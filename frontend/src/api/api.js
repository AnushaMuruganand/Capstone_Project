import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://map-and-weather-backend.onrender.com";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class MapAndWeatherApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${MapAndWeatherApi.token}` };
    const params = (method === "get")
        ? data
      : {};

    try {
      let res = await axios({ url, method, data, params, headers });
      return res;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  //************* Individual API routes *************************/

  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`weather/${username}`);
    return res.data.user;
  }

  //************* MAP API routes *************************/

  /** Get the map Coords for the particular searchTerm */

  static async getMapCoords(searchTerm) {
    const [addressLine, locality, countryRegion, postalCode] = searchTerm.split(",");
    let res = await this.request(`maps/location`, { countryRegion, locality, postalCode, addressLine });
    
    return res.data;
  }

  /** Save the search term "address" to the database */
  static async saveMapAddress(address) {
    await this.request(`maps/location`, { address }, "post");
  }

  /** Get list of top 5 recent locations user searched for when the search bar is focused */
  static async getLocationRecentsMap() {
    const res = await this.request(`maps`, {}, "get");
    const addressList = res.data.addressList;

    return addressList;
  }

  /** Get the auto suggestion list as user types in the address in the search bar */
  static async getAutoSuggestMap(searchTerm, currentCoords) {
    const res = await this.request(`maps/auto`, { searchTerm, currentCoords});
    const autoSuggestList = res.data.addressList;

    return autoSuggestList;
  }

  /** Get the list of restaurants nearby the current location of the user */
  static async getRestaurants(lat, lng) {
    const res = await this.request(`maps/restaurants`, { lat, lng });

    return res.data.restaurants;
  }

  //************* WEATHER API routes *************************/

  /** Get the current weather details of the paticular city name user searched for */
  static async getCurrentWeatherDetails(lat,lng) {
    const res = await this.request(`weather/current`, { lat, lng });
    return res.data.currentWeather;
  }


  static async getForecastWeatherDetails(cityName) {
    const res = await this.request(`weather/forecast`, { cityName });
    return res.data.weeklyWeather;
  }

  /** Save the search term "location" to the database "weather_recents" */
  static async saveWeatherLocation(searchTerm) {
    const [city, region ,country] = searchTerm.split(",");
    const result = await this.request(`weather/current`, { city, region, country }, "post");
    return result;
  }

  /** Save the user searched term "location" to the database "weather_reports" */
  static async saveUserWeatherDetails(searchTerm, username) {
    const [city, region, country] = searchTerm.split(",");
    const result = await this.request(`weather/user/${username}`, { city, region, country }, "post");
    return result;
  }

  /** Get list of top 5 recent locations user searched for when the search bar is focused */
  static async getLocationRecentsWeather() {
    const res = await this.request(`weather`, {}, "get");
    const locationList = res.data.locationList;
    return locationList;
  }

  /** Get the list of the locations user searched if logged in  */
  static async getUserWeatherDetails(username) {
    const res = await this.request(`weather/user/${username}`, {}, "get");
    const userLocationList = res.data.userLocationList;
    return userLocationList;
  }

  /** Get the auto suggestion list as user types in the city name in the search bar */
  static async getAutoSuggestWeather(searchTerm, currentCoords) {
    const res = await this.request(`weather/auto`, { searchTerm });
    const autoSuggestList = res.data.list;

    return autoSuggestList;
  }

  //************* USER AUTH API routes *************************/
  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/login`, data, "post");
    return res.data.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.data.token;
  }

}

export default MapAndWeatherApi;