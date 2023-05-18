import React from "react";

import MapInputPanelView from "./MapInputPanelView";
import "./MapInputPanel.css"

/** Show page with the map.
 *
 * On load, loads input panel to calculate the route directions.
 *
 */

function MapInputPanel() {

    return (
        <div className="MapInputPanel">
            
            <div className="directionsContainer">
                <div>
                    <a href="https://map-n-weather.netlify.app/maps/search" className="Input-button">Go Back</a>
                </div>
                <br/>
                <div id="directionsPanel"></div>
                <div id="directionsItinerary"></div>
                
            </div>
            <div>
                <MapInputPanelView />
            </div>
            
        </div>
    );
}



export default MapInputPanel;
