import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import GoogleMapReact from "google-map-react";

const Marker = () => <img src='/marker-icon.png' alt='marker' />;

const DisplayPoints = () => {
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/Points/lon_lat.csv");
      const text = await response.text();

      // Parse the CSV data using Papa Parse
      const result = Papa.parse(text, { header: true });

      // Extract the necessary coordinates from the parsed data
      const parsedMarkers = result.data.map((row, index) => ({
        id: index,
        Lat: parseFloat(row.Lat),
        Lon: parseFloat(row.Lon),
      }));

      console.log(parsedMarkers);
      // Set the markers state with the parsed data
      setCoordinates(parsedMarkers);
    };

    fetchData();
  }, []);

  console.log("coordinate", coordinates);
  const defaultProps = {
    center: {
      lat: 31.4427071,
      lng: 74.2716663,
    },
    zoom: 13,
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyA9E6uWz77o_rcaq9v8hVtIiYRB7h2oE6U" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {coordinates?.map((coordinate) => (
          <Marker
            key={coordinate?.id}
            lat={coordinate?.Lat}
            lng={coordinate?.Lon}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default DisplayPoints;
