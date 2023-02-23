import logo from "./logo.svg";
import "./App.css";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import React, { useEffect } from "react";
const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};
const MyComponent = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDiqiT6IW_YsGjNh3f-NLj00eD7Hm-z7f8",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker position={{ lat: -3.745, lng: -38.523 }}></Marker>
    </GoogleMap>
  ) : (
    <></>
  );
};
function App() {
  return <MyComponent></MyComponent>;
}

export default App;
