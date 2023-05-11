import React from "react";

/** Show page with the map.
 *
 * On mount, loads map.
 */

function MapView({ lat, lng }) {

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
        
        if (Microsoft !== undefined) {
    
            let map = new Microsoft.Maps.Map("#myMap", {
                credentials: 'AmqtVAecbzoYK2CSsA5JCLhrcI3ia_2skrn2_KJkauiqDTAhuxJM13rQCKRl7Nkc',
                center: new Microsoft.Maps.Location(lat, lng),
                zoom: 15
            });

            let center = map.getCenter();

            //Create custom Pushpin
            let pin = new window.Microsoft.Maps.Pushpin(center, {
                color: 'red'
            });

            //Add the pushpin to the map
            map.entities.push(pin);
        }
    }
    
    return (
        <div className="container" onLoad={loadBingMapScript()} id="myMap" style={{ width: "100vw", height: "100vh"}} ></div>           
    );
}



export default MapView;
