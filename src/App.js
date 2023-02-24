import logo from "./logo.svg";
import "./App.css";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
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
  const [isOpenWindow, setIsOpenWidow] = React.useState(false)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  /**
   * 
   * @param {google.maps.MapMouseEvent} e 
   */
  const onClickMarker = e => setIsOpenWidow(true)

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker onClick={onClickMarker} position={{ lat: -3.745, lng: -38.523 }}>
        {isOpenWindow && 
        <InfoWindow onCloseClick={() => setIsOpenWidow(false)}>
          <div style={{ display: 'flex' ,width: 150, height: 70 }}>
            <div style={{ marginRight: 10 }}>
              <img src='/response.jpg' height={65} alt='place img'/>
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: "bold" }}>test</div>
              <div>infowindow test</div>
            </div>
          </div>
        </InfoWindow>}
      </Marker>
    </GoogleMap>
  ) : (
    <></>
  );
};
function App() {
  return <MyComponent></MyComponent>;
}

export default App;
