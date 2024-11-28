import React, { useEffect, useState } from "react";
import axios from "axios";
import { Map, GoogleApiWrapper, Marker, Circle } from "google-maps-react";

const Maps = (props) => {
  const [allMarker, setAllMarker] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/getCaseCountByAreas`)
      .then((res) => {
        setAllMarker(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Map
      google={props.google}
      style={{ width: "100%", height: "100%" }}
      zoom={10}
      
      initialCenter={{
        lat: 11.941359,
        lng: 79.8005759,
      }}
    >
      {/* Render Circles */}
      {allMarker.map((ele, index) => (
        <Circle
          key={`circle-${index}`}
          radius={500}
          center={{
            lat: parseFloat(ele?.latitude),
            lng: parseFloat(ele?.longitude),
          }}
          strokeColor={
            ele?.count > 10
              ? "#FF0000"
              : ele?.count >= 5
              ? "#ffa500"
              : "#00FF00"
          }
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor={
            ele?.count > 10
              ? "#FF0000"
              : ele?.count >= 5
              ? "#ffa500"
              : "#00FF00"
          }
          fillOpacity={0.35}
        />
      ))}

      {/* Render Markers */}
      {allMarker.map((ele, index) => (
        <Marker
          key={`marker-${index}`}
          label={{
            text: String(`${ele?.count}`), // Custom text
            color: "black", // Text color
            fontSize: "20px", // Font size
            // Font weight
          }}
          icon={{
            scaledSize: new props.google.maps.Size(64, 64),
            url:
              ele.count >= 10
                ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                : ele.count >= 5
                ? "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
                : "http://maps.google.com/mapfiles/ms/icons/green-dot.png", // Change the color or URL of the marker
          }}
          position={{
            lat: ele?.latitude,
            lng: ele?.longitude,
          }}
          title={ele?.area}
        />
      ))}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: import.meta.env.VITE_MAP_API,
})(Maps);
