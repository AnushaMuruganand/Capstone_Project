import React from "react";

import "./MapInputPanel.css"

/** Show page with the map.
 *
 * On mount, loads map with the route direction of the start and end destination specified in the input panel.
 *
 */

function MapInputPanelView() {

    function loadBingMapScript() {
    
        window.loadMapScenario = () => InitMap();
    
        const script = document.createElement("script");
        script.src = "http://www.bing.com/api/maps/mapcontrol?callback=loadMapScenario&key=AmqtVAecbzoYK2CSsA5JCLhrcI3ia_2skrn2_KJkauiqDTAhuxJM13rQCKRl7Nkc";
        script.async = true;
        script.defer = true;
    
        document.body.appendChild(script);
    }

    function InitMap() {
        let Microsoft = window.Microsoft;

        let map;
        let directionsManager;
        
        if (Microsoft !== undefined) {
    
            map = new Microsoft.Maps.Map("#myMap", {});

            //Load the directions module.
            Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
                //Create an instance of the directions manager.
                directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);

                //Specify where to display the route instructions.
                directionsManager.setRenderOptions({ itineraryContainer: '#directionsItinerary' });

                //Specify the where to display the input panel
                directionsManager.showInputPanel('directionsPanel');
            });
        }
    }

    return (    
        <div onLoad={loadBingMapScript()} id="myMap" ></div>             
    );
}



export default MapInputPanelView;
