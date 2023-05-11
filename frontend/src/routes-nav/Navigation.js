import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import UserContext from "../auth/UserContext";

/** Navigation bar for site. Shows up on every page.
 *
 * Shows links to main areas of site. 
 *
 * Rendered by App.
 */

function Navigation({logout}) { 
    
    const { currentUser} = useContext(UserContext);
    const [clicked, setClicked] = useState(false);

    function weatherClicked() {
        setClicked(true);
    }

    function otherClicked() {
        setClicked(false);
    }

    function loggedInNav() {
        return (
            <>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/maps" onClick={otherClicked}>
                            Maps
                        </NavLink>
                    </li>
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/weather" onClick={weatherClicked}>
                            Weather
                        </NavLink>
                    </li>
                </ul>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <li className="text-center">
                Welcome <b>{currentUser.firstName.toUpperCase() || currentUser.username.toUpperCase()}</b>
                </li>

                <div className="collapse navbar-collapse justify-content-end dropdown" >
                    <Link className="nav-link" to="/weather" onClick={() => { logout(); otherClicked(); }}>
                        <div>
                            LogOut
                        </div>
                            
                    </Link>
                    &nbsp;&nbsp;&nbsp;
                </div>
            </>
        );
    }
  
    function loggedOutNav() {
        return (
            <>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/maps" onClick={otherClicked}>
                            Maps
                        </NavLink>
                    </li>
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/weather" onClick={weatherClicked}>
                            Weather
                        </NavLink>
                    </li>
                </ul>
                <div className="collapse navbar-collapse justify-content-end">
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/weather/login">
                            Login
                        </NavLink>
                    </li>
                    &nbsp;&nbsp;&nbsp;
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/weather/signup">
                            Sign Up
                        </NavLink>
                    </li>
                    &nbsp;&nbsp;&nbsp;
                </div>
            </>
        );
    }
   
    if (clicked) {
        
        return (
            <nav className="Navigation navbar navbar-expand-md">
                <Link className="navbar-brand" to="/" onClick={otherClicked}>
                    Map and Weather
                </Link>

                {currentUser ? loggedInNav() : loggedOutNav()}
            </nav>  
        );
    }
    else {
        return (
            <nav className="Navigation navbar navbar-expand-md">
                <Link className="navbar-brand" to="/" onClick={otherClicked}>
                    Map and Weather
                </Link>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/maps" onClick={otherClicked}>
                            Maps
                        </NavLink>
                    </li>
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/weather" onClick={weatherClicked}>
                            Weather
                        </NavLink>
                    </li>
                </ul>
            </nav>
        );
    }

}

export default Navigation;
