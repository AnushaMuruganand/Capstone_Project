import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Homepage from "../homepage/Homepage";
import Map from "../maps/Map";
import MapHome from "../maps/MapHome";
import WeatherHome from "../weather/WeatherHome";
import WeatherLoginForm from "../auth/WeatherLoginForm";
import WeatherSignupForm from "../auth/WeatherSignUpForm";
import MapInputPanel from "../maps/MapInputPanel";
import Weather from "../weather/Weather";
import WeatherFullDetails from "../weather/WeatherFullDetails";

/** Site-wide routes.
 * Visiting a non-existant route redirects to the homepage.
*/

function Routes({login, signup}) {

    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>

                <Route exact path="/maps">
                    <MapHome />
                </Route>

                <Route exact path="/maps/search">
                    <Map />
                </Route>

                <Route exact path="/maps/search/restaurants">
                    <Map />
                </Route>

                <Route exact path="/maps/search/routes">
                    <MapInputPanel />
                </Route>

                <Route exact path="/weather">
                    <WeatherHome />
                </Route>

                <Route exact path="/weather/search">
                    <Weather/>
                </Route>

                <Route exact path="/weather/search/detail">
                    <WeatherFullDetails/>
                </Route>
  
                <Route exact path="/weather/login">
                    <WeatherLoginForm login={login} />
                </Route>
  
                <Route exact path="/weather/signup">
                    <WeatherSignupForm signup={signup} />
                </Route>
  
                <Redirect to="/" />
            </Switch>
        </div>
    );

}

export default Routes;
