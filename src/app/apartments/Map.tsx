"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./Map.module.scss";

import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import * as turf from "@turf/turf";

interface MapProps {
  update?: boolean;
}

const mockMarkers = [
  {
    id: 1,
    title: "Уютная квартира в центре",
    cost: "180 000",
    image: "/apartment1.jpg",
    coords: [76.9286, 43.2383] as [number, number], // Centered on Almaty
  },
  {
    id: 2,
    title: "Современная студия",
    cost: "220 000",
    image: "/apartment2.jpg",
    coords: [77.0, 43.2] as [number, number],
  },
  {
    id: 3,
    title: "Комната с панорамным видом",
    cost: "150 000",
    image: "/apartment3.jpg",
    coords: [76.85, 43.25] as [number, number],
  },
];

const Map: React.FC<MapProps> = ({ update }) => {
  // Provide your Mapbox token here or via an env variable
  mapboxgl.accessToken =
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
    "pk.eyJ1IjoibWVpcm1hbi1pcy1yZWF0b3IiLCJhIjoiY2x5NjVpaWNlMDVneDJ0c2F6cTVxNzZqNSJ9.WVkGzQEf4yJGjr98WSgzpA";

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [calculatedArea, setCalculatedArea] = useState("");

  // Initialize the map on mount
  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [76.9286, 43.2383],
      zoom: 12,
    });

    // Add markers with redesigned popups using our mock data
    mockMarkers.forEach((marker) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="${styles.popup}">
          <a href="/announcement/${marker.id}" class="${styles.popupLink}">
            <div class="${styles.popupCard}">
              <img src="${marker.image}" alt="${marker.title}" class="${styles.popupImage}" />
              <h3 class="${styles.popupTitle}">${marker.title}</h3>
              <p class="${styles.popupPrice}">${marker.cost} <span>₸</span></p>
            </div>
          </a>
        </div>
      `);

      new mapboxgl.Marker({ color: "#3FB1CE" })
        .setLngLat(marker.coords)
        .setPopup(popup)
        .addTo(mapRef.current!);
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: "draw_polygon",
    });
    mapRef.current.addControl(draw);

    // 4) Set up draw event handlers
    mapRef.current.on("draw.create", handleDraw);
    mapRef.current.on("draw.delete", handleDraw);
    mapRef.current.on("draw.update", handleDraw);

    function handleDraw(e: any) {
      const data = draw.getAll();
      if (data.features.length > 0) {
        // Use Turf.js to calculate area (square meters by default)
        const area = turf.area(data);
        // Restrict the area to 2 decimal points
        const rounded = Math.round(area * 100) / 100;
        setCalculatedArea(`${rounded} square meters`);
      } else {
        setCalculatedArea("");
        // If not deleting, show an alert prompting user to draw
        if (e.type !== "draw.delete") {
          alert("Click the map to draw a polygon.");
        }
      }
    }

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  // When the "update" prop changes, trigger a map resize
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.resize();
    }
  }, [update]);

  return <div className={styles.mapContainer} ref={mapContainerRef} />;
};

export default Map;
