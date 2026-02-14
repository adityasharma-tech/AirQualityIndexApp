"use client";
import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useGeolocated } from "react-geolocated";

export default function App() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!,
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [mounted, setMounted] = React.useState(false);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const onLoad = React.useCallback(
    function callback(map: google.maps.Map) {
      if (!coords) throw new Error("Failed to get geolocation data");
      const bounds = new window.google.maps.LatLngBounds({
        lat: coords.latitude,
        lng: coords.longitude,
      });
      map.fitBounds(bounds);

      setMap(map);
    },
    [coords, setMap],
  );

  const onUnmount = React.useCallback(
    function callback(map: google.maps.Map) {
      setMap(null);
    },
    [setMap],
  );

  React.useEffect(() => {
    setMounted(true);

    navigator.geolocation.getCurrentPosition(console.log)
  }, []);

  if (!mounted) return null;

  return !isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : coords ? (
    <React.Fragment>
      <main>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ height: "100vh", width: "100vw" }}
            center={{
              lat: coords.latitude,
              lng: coords.longitude,
            }}
            zoom={8}
            onLoad={onLoad}
            onUnmount={onUnmount}
          ></GoogleMap>
        ) : null}
      </main>
    </React.Fragment>
  ) : (
    <div>Getting the location data&hellip; </div>
  );
}
