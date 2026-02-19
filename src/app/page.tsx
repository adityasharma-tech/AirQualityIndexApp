"use client";

import React, { useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Circle,
  InfoWindow,
  Polygon,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

type Point = {
  lat: number;
  lng: number;
  temperature: number;
  humidity: number;
  co2: number;
  pressure: number;
};

export default function MapPage() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!,
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [points, setPoints] = React.useState<any[]>([]);
  const pointsRef = React.useRef<any[]>([]);
  const [selected, setSelected] = React.useState<any | null>(null);

  const getConvexHull = (points: any[]) => {
    if (points.length < 3) return points;

    const cross = (o: any, a: any, b: any) =>
      (a.lat - o.lat) * (b.lng - o.lng) - (a.lng - o.lng) * (b.lat - o.lat);

    const sorted = [...points].sort((a, b) =>
      a.lat === b.lat ? a.lng - b.lng : a.lat - b.lat,
    );

    const lower: any[] = [];
    for (let p of sorted) {
      while (
        lower.length >= 2 &&
        cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0
      ) {
        lower.pop();
      }
      lower.push(p);
    }

    const upper: any[] = [];
    for (let i = sorted.length - 1; i >= 0; i--) {
      let p = sorted[i];
      while (
        upper.length >= 2 &&
        cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0
      ) {
        upper.pop();
      }
      upper.push(p);
    }

    upper.pop();
    lower.pop();

    return lower.concat(upper);
  };

  const getDistance = (a: Point, b: Point) => {
    const R = 6371000;
    const dLat = ((b.lat - a.lat) * Math.PI) / 180;
    const dLng = ((b.lng - a.lng) * Math.PI) / 180;

    const lat1 = (a.lat * Math.PI) / 180;
    const lat2 = (b.lat * Math.PI) / 180;

    const x =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);

    return 2 * R * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  };

  const clusterPoints = (data: any[], radius = 80) => {
    const clusters: any[] = [];

    data.forEach((point) => {
      let foundCluster = false;

      for (let cluster of clusters) {
        const distance = getDistance(point, cluster.center);

        if (distance < radius) {
          cluster.points.push(point);
          cluster.temperature += point.temperature;
          cluster.humidity += point.humidity;
          cluster.co2 += point.co2;
          cluster.pressure += point.pressure;
          cluster.count += 1;
          foundCluster = true;
          break;
        }
      }

      if (!foundCluster) {
        clusters.push({
          center: point,
          points: [point],
          temperature: point.temperature,
          humidity: point.humidity,
          co2: point.co2,
          pressure: point.pressure,
          count: 1,
        });
      }
    });

    return clusters.map((c) => ({
      ...c,
      temperature: c.temperature / c.count,
      humidity: c.humidity / c.count,
      co2: c.co2 / c.count,
      pressure: c.pressure / c.count,
      polygon: getConvexHull(c.points),
    }));
  };

  const fetchDataWithMap = async (mapInstance: google.maps.Map) => {
    console.log("fetching");

    const bounds = mapInstance.getBounds();
    if (!bounds) return;

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    try {
      const res = await fetch(
        `/api/query?north=${ne.lat()}&south=${sw.lat()}&east=${ne.lng()}&west=${sw.lng()}`,
      );

      const data = await res.json();
      const clustered = clusterPoints(data, 80);
      setPoints(clustered);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  useEffect(() => {
    console.log(points);
  }, [points]);

  const getColor = (co2: number) => {
    if (co2 < 0.5) return "#2ecc71";
    if (co2 < 0.8) return "#f1c40f";
    return "#e74c3c";
  };

  const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    // mapId: "c764e75fad0c9c3cb603c4e6",
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    styles: [
      {
        stylers: [
          {
            saturation: -100,
          },
          {
            gamma: 1,
          },
        ],
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "poi.business",
        elementType: "labels.text",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "poi.business",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "poi.place_of_worship",
        elementType: "labels.text",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "poi.place_of_worship",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            visibility: "simplified",
          },
        ],
      },
      {
        featureType: "water",
        stylers: [
          {
            visibility: "on",
          },
          {
            saturation: 50,
          },
          {
            gamma: 0,
          },
          {
            hue: "#50a5d1",
          },
        ],
      },
      {
        featureType: "administrative.neighborhood",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#333333",
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "labels.text",
        stylers: [
          {
            weight: 0.5,
          },
          {
            color: "#333333",
          },
        ],
      },
      {
        featureType: "transit.station",
        elementType: "labels.icon",
        stylers: [
          {
            gamma: 1,
          },
          {
            saturation: 50,
          },
        ],
      },
    ],
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={14}
        center={map?.getCenter() ?? { lat: 28.477064, lng: 77.4819197 }}
        onLoad={(m) => {
          setMap(m);

          // Initial load (only once)
          fetchDataWithMap(m);

          // Fetch only when user stops dragging
          m.addListener("dragend", () => fetchDataWithMap(m));

          // Fetch when zoom changes
          m.addListener("zoom_changed", () => fetchDataWithMap(m));
        }}
        options={mapOptions}
      >
        {points.map((cluster, index) => (
          <Polygon
            key={index}
            paths={cluster.polygon.map((p: any) => ({
              lat: p.lat,
              lng: p.lng,
            }))}
            options={{
              fillColor: getColor(cluster.co2),
              fillOpacity: 0.5,
              strokeColor: getColor(cluster.co2),
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
            onClick={() => setSelected(cluster)}
          />
        ))}

        {selected && (
          <InfoWindow
            position={{
              lat: selected.center.lat,
              lng: selected.center.lng,
            }}
            onCloseClick={() => setSelected(null)}
          >
            <div style={{ color: "#000" }}>
              <p>
                <b>Temperature:</b> {selected.temperature.toFixed(2)} °C
              </p>
              <p>
                <b>Humidity:</b> {selected.humidity.toFixed(2)} %
              </p>
              <p>
                <b>CO2:</b> {selected.co2.toFixed(2)}
              </p>
              <p>
                <b>Pressure:</b> {selected.pressure.toFixed(2)} hPa
              </p>
              <p>
                <b>Samples merged:</b> {selected.count}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
}
