import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MapTracking.styles.css";

import ReactMapGl, {
  Marker,
  GeolocateControl,
  FlyToInterpolator,
} from "react-map-gl";

import useInterval from "../../hooks/useInterval";

const geolocateControlStyle = {
  right: 10,
  top: 10,
};

const MapTracking = () => {
  const location = useLocation();

  const accessToken =
    "pk.eyJ1IjoibWl0ZWoyMyIsImEiOiJja3N4MDkwZ2QyNXQxMm50ZnRwNmloZ3ltIn0.cyrDiGmpr5z544YWF5-bVQ";

  const [viewport, setViewport] = useState({
    latitude: location.state.lat,
    longitude: location.state.lng,
    width: "70vw",
    height: "70vh",
    zoom: 12,
  });

  const [myLat, setMyLat] = useState(19.236988);
  const [myLng, setMyLng] = useState(72.846595);

  //console.log(location.state);

  const goToMyLocation = () => {
    setViewport({
      ...viewport,
      longitude: 72.846595,
      latitude: 19.236988,
      zoom: 14,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      // transitionEasing: easeCubic,
    });
  };

  useInterval(() => {
    // Your custom logic here
    setMyLat(myLat + 0.0001);
    setMyLng(myLng + 0.0001);
    console.log(myLat, myLng);
    //console.log("test");
  }, 1000);

  return (
    <div>
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={accessToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          auto
        />
        <Marker
          latitude={myLat}
          longitude={myLng}
          offsetLeft={-1}
          offsetTop={-1}
        >
          <div>You are here</div>
        </Marker>
      </ReactMapGl>
      <button onClick={goToMyLocation}>New York City</button>
    </div>
  );
};

export default MapTracking;
