import React, { useState } from "react";
import "./SearchFormWeather.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MapAndWeatherApi from "../api/api";
import { useHistory } from "react-router-dom";

/** Search widget.
 *
 * Appears on Weather so that these can be filtered
 * down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * { Weather } -> SearchFormWeather
 */

function SearchFormWeather({ searchFor }) {

  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const [focused, setIsFocused] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [close, setClose] = useState(false);


  /** Tell parent to filter */
  function handleSubmit(evt) {
    // take care of accidentally trying to search for just spaces
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
    setClose(true);

  }

  /** Update form fields */
  async function handleChange(evt) {
    setSearchTerm(evt.target.value);
    const autoSuggestList = await MapAndWeatherApi.getAutoSuggestWeather(evt.target.value);
    setSearchList([...autoSuggestList]);
    document.getElementById("locationList").style.display = "block";
    setIsFocused(false);
  }

  /** When search bar is focused show the dropdown of the recent searches */
  async function searchBarFocus() {
    setIsFocused(true);
    const locationRecents = await MapAndWeatherApi.getLocationRecentsWeather();
    setSearchList([...locationRecents]);
    document.getElementById("locationList").style.display = "block";
  }
  
  /** Function called when an address is selected from the drop down option */
  function locationSelected(evt) {
    document.querySelector("input").value = evt.target.value;
    setSearchTerm(evt.target.value);
    document.getElementById("locationList").style.display = "none";
  }

  /** Function to clear the search field after the close button is clicked */
  function clearInput() {
    setIsFocused(true);
    setSearchList([]);
    setSearchTerm("");
    history.push("/weather/search");
  }

  if (focused) {
    return (
      <div className="SearchFormWeather mb-4">
        <form className="form-inline" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              className="form-control form-control-lg flex-grow-1"
              list=""
              name="searchTerm"
              placeholder="Enter search term.."
              value={searchTerm}
              onChange={handleChange}
              onFocus={searchBarFocus}
            />
            <div className="input-group-postpend">
              <button type="submit" className="input-group-text" style={{ height: "50px" }}><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></button>
            </div>
            {close ?
              <div className="input-group-postpend">
                <span className="input-group-text close" style={{ height: "50px" }} onClick={clearInput}><FontAwesomeIcon icon="fa-solid fa-xmark" /></span>
              </div> :
              ""
            }

          </div>
          
          {/* Recent Search results container */}
              
          <datalist id="locationList" style={{width:"460px"}}>
            {searchList.map((location, i) => {
              return (
                <option id="option" key={i} value={location.city + "," + location.region + "," + location.country} onClick={locationSelected} >{location.city},{location.region},{location.country} </option>
              );
            })}
          </datalist>
        </form>
      </div>
    );
  }
  else {
    return (
      <div className="SearchFormWeather mb-4">
        <form className="form-inline" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              className="form-control form-control-lg flex-grow-1"
              list=""
              name="searchTerm"
              placeholder="Enter search term.."
              value={searchTerm}
              onChange={handleChange}
              onFocus={searchBarFocus}
            />
            <div className="input-group-postpend">
              <button type="submit" className="input-group-text" style={{ height: "50px" }}><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></button>
            </div>
            {close ?
              <div className="input-group-postpend">
                <span className="input-group-text close" style={{ height: "50px" }} onClick={clearInput}><FontAwesomeIcon icon="fa-solid fa-xmark" /></span>
              </div> :
              ""
            }
          </div>

          {/* Recent Search results container */}
              
          <datalist id="locationList" style={{width:"460px"}} >
            {searchList.map((location, i) => {
              return (
                <option id="option" key={i} value={location.name + "," + location.region + "," + location.country} onClick={locationSelected} >{location.name},{location.region},{location.country} </option>
              );
            })}
          </datalist>
        </form>
      </div>
    );
  }
}

export default SearchFormWeather;
