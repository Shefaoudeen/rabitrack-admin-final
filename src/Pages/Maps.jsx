import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";
import {IoArrowBackCircleOutline} from "react-icons/io5";

const Maps = (props) => {
  const [allMarker, setAllMarker] = useState([]);
  const containerStyle = {
    width: "100dvw",
    height: "75dvh",
    position: "absolute",
  };

  const center = {
    lat: 11.9419659,
    lng: 79.8062299,
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/getCaseCountByAreas`)
      .then((res) => {
        setAllMarker(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_API}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <div className="absolute md:left-10 md:top-20 ">
        <Link to={"/"} className="bg-slate-300 rounded-full">
          <IoArrowBackCircleOutline  size={40} color="#3B82F6"/>
        </Link>
        </div>
        {allMarker.map((ele, index) => (
          <Circle
            key={`circle-${index}`}
            radius={500}
            options={{
              strokeColor:
                ele?.count > 10
                  ? "#FF0000" // Red for high counts
                  : ele?.count >= 5
                  ? "#FFA500" // Orange for medium counts
                  : "#00FF00", // Green for low counts
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor:
                ele?.count > 10
                  ? "#FF0000" // Same red for fill
                  : ele?.count >= 5
                  ? "#FFA500" // Same orange for fill
                  : "#00FF00", // Same green for fill
              fillOpacity: 0.35,
            }}
            center={{
              lat: parseFloat(ele?.latitude),
              lng: parseFloat(ele?.longitude),
            }}
          />
        ))}
        {allMarker.map((ele, index) => (
          <Marker
            key={`marker-${index}`}
            position={{
              lat: parseFloat(ele?.latitude),
              lng: parseFloat(ele?.longitude),
            }}
            title={ele?.area}
            label={{
              text: String(ele?.count), // Show the count as a label
              color: "black", // Text color
              fontSize: "12px", // Font size
              fontWeight: "bold", // Text weight
            }}
            icon={{
              url:
                ele?.count > 10
                  ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                  : ele?.count >= 5
                  ? "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
                  : "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
              scaledSize: new window.google.maps.Size(60, 60), // Adjust icon size
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
  /*
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
      ###{/* Render Circles }
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

      ###{/* Render Markers }
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
  );*/
};

export default Maps;

/*
export default GoogleApiWrapper({
  apiKey: import.meta.env.VITE_MAP_API,
})(Maps);
*/
