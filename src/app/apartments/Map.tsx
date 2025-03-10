"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./Map.module.scss";

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
