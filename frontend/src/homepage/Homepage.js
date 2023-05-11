import React from "react";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

import "./Homepage.css";
import Helmet from 'react-helmet';

/** Homepage of site.
 *
 * Shows welcome message .
 *
 * Routed at /
 *
 */

function Homepage() {

  return (
    <div className="Homepage">
      <Helmet bodyAttributes={{ style: 'background-color : aliceblue' }} />
      <div className="container text-center">
        <h1 className="Homepage-title mb-4 font-weight-bold">Map and Weather Site</h1>
        <p className="Homepage-description"> Start looking for locations , restaurants on  <b>MAP 🗺️</b> and <b>WEATHER 🌦️ REPORT</b>  of any location... ENJOY!!!!!!</p>
      
        <AliceCarousel autoPlay infinite disableDotsControls
          disableButtonsControls autoPlayInterval={1000}>
          <img src="https://www.nationsonline.org/maps/Political-World-Map-3360.jpg" className="sliderimg" alt="" />
          <img src="https://e0.pxfuel.com/wallpapers/873/669/desktop-wallpaper-restaurant-menu-vector-1807875-restaurant-food.jpg" className="sliderimg" alt="" />
          <img src="https://pas-wordpress-media.s3.amazonaws.com/content/uploads/2019/10/24135155/Fast-Food-Restaurant-Sample-Business-Plan-1-min.jpg" className="sliderimg" alt="" />
          <img src="https://cdn.cnn.com/cnnnext/dam/assets/210316134609-01-wisdom-project-spring-super-tease.jpg" className="sliderimg" alt="" />
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3VtbWVyJTIwc2Vhc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" className="sliderimg" alt="" />
          <img src="https://i.pinimg.com/736x/13/ef/9c/13ef9c9fd004604b2ee78415033dd08a.jpg" className="sliderimg" alt="" />
          <img src="https://e3.365dm.com/22/11/2048x1152/skynews-rainfall-weather-umbrella_5954037.jpg" className="sliderimg" alt="" />
          <img src="https://c4.wallpaperflare.com/wallpaper/27/315/619/winter-season-mountains-wallpaper-preview.jpg" className="sliderimg" alt="" />
        </AliceCarousel>
      </div>
    </div>
  );
}

export default Homepage;
