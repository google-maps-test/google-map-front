import "./App.css";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  Autocomplete,
  LoadScript,
} from "@react-google-maps/api";
import { useCallback, useState } from "react";
const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 37.54662740106675,
  lng: 126.94984316825867,
};
const MyComponent = () => {
  const [map, setMap] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [isOpenWindow, setIsOpenWidow] = useState(false);

  const onLoad = useCallback(
    function callback(map) {
      map.addListener("click", (e) => {
        console.log("e::", e.latLng.lat());
        console.log("e::", e.latLng.lng());

        geocodeLatLng(
          geocoder,
          map,
          infowindow,
          e.latLng.lat(),
          e.latLng.lng()
        );
      });

      setGeocoder(new window.google.maps.Geocoder());
      setInfowindow(new window.google.maps.InfoWindow());
      setMap(map);
    },
    [geocoder, infowindow]
  );

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onClickMarker = (e) => setIsOpenWidow(true);
  const onPlaceChanged = (e) => {
    if (autocomplete !== null && autocomplete.getPlace().geometry) {
      const { lat, lng } = autocomplete.getPlace().geometry.location;

      map.panTo({
        lat: lat(),
        lng: lng(),
      });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const onLoad2 = (autocomplete) => {
    console.log("autocomplete: ", autocomplete);

    setAutocomplete(autocomplete);
  };
  return true ? (
    <div style={{ height: "100vh", width: "100%" }}>
      <LoadScript
        googleMapsApiKey={"AIzaSyDiqiT6IW_YsGjNh3f-NLj00eD7Hm-z7f8"}
        libraries={["places"]}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Autocomplete onLoad={onLoad2} onPlaceChanged={onPlaceChanged}>
            <input
              type="text"
              placeholder="Customized your placeholder"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px",
              }}
            />
          </Autocomplete>
          <Marker
            onClick={onClickMarker}
            position={{ lat: -3.745, lng: -38.523 }}
          >
            {isOpenWindow && (
              <InfoWindow onCloseClick={() => setIsOpenWidow(false)}>
                <div style={{ display: "flex", width: 150, height: 70 }}>
                  <div style={{ marginRight: 10 }}>
                    <img src="/response.jpg" height={65} alt="place img" />
                  </div>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: "bold" }}>test</div>
                    <div>infowindow test</div>
                  </div>
                </div>
              </InfoWindow>
            )}
          </Marker>
        </GoogleMap>
      </LoadScript>
    </div>
  ) : (
    <></>
  );
};
function App() {
  return <MyComponent></MyComponent>;
}

export default App;

const geocodeLatLng = (geocoder, map, infowindow, lat, lng) => {
  const latlng = {
    lat: lat,
    lng: lng,
  };

  geocoder
    .geocode({ location: latlng })
    .then((response) => {
      if (response.results[0]) {
        const marker = new window.google.maps.Marker({
          position: latlng,
          map: map,
        });

        const placesService = new window.google.maps.places.PlacesService(map);

        placesService.getDetails(
          { placeId: response.results[0].place_id },
          (a, b) => {
            console.log("a::", a);
            console.log("b::", b);
          }
        );

        infowindow.setContent(response.results[0].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
};
