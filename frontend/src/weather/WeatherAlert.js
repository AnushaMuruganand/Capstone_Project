import React from "react";
import "./WeatherFullDetails.css";

/** Component rendered from <WeatherFullDetails>.
 *
 * Shows weather alerts/warning if there
 *
 */

function WeatherAlert({ alerts }) {
    return (
        <div className="WeatherDetail_Alerts">
            <div style={{ textAlign: "left", marginLeft: "10px" }}>
                <b>Alerts</b>
            </div>
            {alerts.map(alert => {
                return (
                    <li>
                        <b>{alert.headline}</b>
                        <br />
                        {alert.note}
                    </li>
                );
            })}
        </div>
    );
}

export default WeatherAlert;