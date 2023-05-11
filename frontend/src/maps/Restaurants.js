import React from "react";

import "./Restaurants.css";

/** Show page with the map and restaurants.
 *
 * On load, loads the nearby restaurants of the current location of user
 * - When user changes the map view by moving the map loads the nearby restaurants of that location
 *
 * This is routed to at /maps/restaurants
 */


function Restaurants({ restaurants, getRestaurants }) {

    let pinInfobox = null;

    function loadBingMapScript() {
    
        window.loadMapScenario = () => InitMap();
    
        const script = document.createElement("script");
        script.src = "https://www.bing.com/maps/sdk/mapcontrol?callback=loadMapScenario";
        script.async = true;
        script.defer = true;
    
        document.body.appendChild(script);
    }

    function InitMap() {
        let Microsoft = window.Microsoft;
        
        let map;

        if (Microsoft !== undefined) {
    
            map = new Microsoft.Maps.Map("#myMap", {
                credentials: 'AmqtVAecbzoYK2CSsA5JCLhrcI3ia_2skrn2_KJkauiqDTAhuxJM13rQCKRl7Nkc',
                center: new Microsoft.Maps.Location(restaurants[0].coords.latitude, restaurants[0].coords.longitude),
                zoom: 13
            });


            map.entities.clear();

            function fullDetails(restaurant) {

                const price = restaurant[0].price ? `<b>Price :</b> ${restaurant[0].price}` : "";
                const category = restaurant[0].category ? restaurant[0].category : "";
                const rating = restaurant[0].rating ? `<b>Rating : </b>${restaurant[0].rating}/5` : "";
                const image = restaurant[0].image ? `<img src=${restaurant[0].image} style="width:125px; height:125px">` : "";
                let stars = "";
                
                for (let i = 0; i < Math.floor(restaurant[0].rating); i++){
                    stars += String.fromCodePoint(9733);
                }

                const result = `
                <div>${image}</div>
                <div><p> ${category} </p> <p>${price}</p> <p>${rating} ${stars}
                </p></div>`;

                return result;
                
            }

            // Function to show the restaurant details when hovered over a pushpin
            function showRestaurantDetails(e) {

                const restaurant = restaurants.filter((r => {
                    if (r.coords.latitude === e.target.geometry.y && r.coords.longitude === e.target.geometry.x) {
                        return r;
                    }
                }));
                    
                //Define an HTML template for a custom infobox.
                let infoboxTemplate = `
                <div class="customInfobox">
                    <div class="title">{title}</div>
                    {description}
                </div>`;
                
                // build or display the infoBox
                let pin = e.target;
                if (pin != null) {

                    // Create the info box for the pushpin
                    let location = pin.getLocation();
                    let title = `${restaurant[0].name}`;
                    let description = fullDetails(restaurant);
                    
                    // Create the infobox by assing the title and description into the template and pass it into the infobox as an option.
                    pinInfobox = new Microsoft.Maps.Infobox(location, {
                        htmlContent: infoboxTemplate.replace('{title}', title).replace('{description}', description)
                    });

                    //Assign the infobox to a map instance.
                    pinInfobox.setMap(map);

                }
            }

            // Function to hide the restaurant details when mouse moved out off a pushpin
            function hideRestaurantDetails() {
                if (pinInfobox != null)
                    pinInfobox.setOptions({ visible: false });
            }

            // Function to get the position when the map is dragged
            function getPosition(event) {
                let center = map.getCenter();
                if (typeof event.cause === 'undefined') {
                    getRestaurants(center.latitude, center.longitude);
                } 
                
            }


            restaurants.map((restaurant) => {
                //Create custom Pushpin
                let pushpin = new window.Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(restaurant.coords.latitude, restaurant.coords.longitude), {
                    icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png',
                    title: restaurant.name,
                });

                Microsoft.Maps.Events.addHandler(pushpin, 'mouseover', showRestaurantDetails);
                Microsoft.Maps.Events.addHandler(pushpin, 'mouseout', hideRestaurantDetails);

                //Add the pushpin to the map
                map.entities.push(pushpin);
            });
        
            Microsoft.Maps.Events.addHandler(map, 'viewchangeend',getPosition);
        }
    }

    return (
        <div className="Restaurants">
            <div className="container" onLoad={loadBingMapScript()} id="myMap" style={{ width: "100vw", height: "100vh"}} ></div>
        </div>             
    );
}

export default Restaurants;
