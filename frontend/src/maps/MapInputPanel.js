import React from "react";

import MapInputPanelView from "./MapInputPanelView";
import "./MapInputPanel.css"
import { useHistory } from "react-router-dom";

/** Show page with the map.
 *
 * On load, loads input panel to calculate the route directions.
 *
 */

function MapInputPanel() {

    const history = useHistory();

    function push() {
        history.push("/maps/search");
    }

    return (
        <div className="MapInputPanel">
            
            <div className="directionsContainer">
                <div>
                    <button onClick={push} className="Input-button">Go Back</button>
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
