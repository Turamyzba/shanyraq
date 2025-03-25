"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./Map.module.scss";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Supercluster from 'supercluster';
import { useMediaQuery } from "react-responsive";
import { Card } from "@/types/common";

type Point = {x: number, y: number};

interface MapProps {
  update?: boolean;
  apartments?: Card[];
  isLoading?: boolean;
  onPointsSelected?: (points: Point[]) => void;
}

const Map: React.FC<MapProps> = ({ update, apartments = [], isLoading = false, onPointsSelected }) => {
  mapboxgl.accessToken =
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
    "pk.eyJ1IjoibWVpcm1hbi1pcy1yZWF0b3IiLCJhIjoiY2x5NjVpaWNlMDVneDJ0c2F6cTVxNzZqNSJ9.WVkGzQEf4yJGjr98WSgzpA";

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const popupsRef = useRef<mapboxgl.Popup[]>([]);
  const drawRef = useRef<any>(null);
  const [selectedPoints, setSelectedPoints] = useState<Point[]>([]);
  const superclusterRef = useRef<Supercluster | null>(null);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isSmallMobile = useMediaQuery({ maxWidth: 480 });

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [76.9286, 43.2383],
      zoom: 12,
    });

    const map = mapRef.current;
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }),
      'bottom-right'
    );

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: "simple_select",
    });
    
    drawRef.current = draw;
    map.addControl(draw);

    function handleDraw(e: any) {
      const data = draw.getAll();
      if (data.features.length > 0) {
        const points: {x: number, y: number}[] = [];
        
        data.features.forEach(feature => {
          if (feature.geometry.type === 'Polygon') {
            feature.geometry.coordinates[0].forEach((coord) => {
              points.push({ x: coord[0], y: coord[1] } as any);
            });
          }
        });
        
        setSelectedPoints(points);
        if (onPointsSelected) {
          onPointsSelected(points);
        }
      } else {
        setSelectedPoints([]);
        if (onPointsSelected) {
          onPointsSelected([]);
        }
      }
    }

    const trashButton = document.querySelector('.mapbox-gl-draw_trash');
    if (trashButton) {
      trashButton.addEventListener('click', () => {
        setSelectedPoints([]);
        if (onPointsSelected) {
          onPointsSelected([]);
        }
      });
    }

    map.on("draw.create", handleDraw);
    map.on("draw.delete", handleDraw);
    map.on("draw.update", handleDraw);

    map.on('load', () => {
      updateMarkers();
    });

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      popupsRef.current.forEach(popup => popup.remove());
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && mapRef.current.loaded() && apartments.length > 0) {
      updateMarkers();
    }
  }, [apartments]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.resize();
    }
  }, [update]);

  const toggleDrawingMode = () => {
    if (!drawRef.current) return;
    
    const currentMode = drawRef.current.getMode();
    if (currentMode === 'simple_select' || currentMode === 'direct_select') {
      drawRef.current.changeMode('draw_polygon');
      setIsDrawingMode(true);
    } else {
      drawRef.current.changeMode('simple_select');
      setIsDrawingMode(false);
    }
  };

  const updateMarkers = () => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    popupsRef.current.forEach(popup => popup.remove());
    popupsRef.current = [];

    if (!mapRef.current || apartments.length === 0) return;

    const map = mapRef.current;

    const validApartments = apartments.filter(apt => {
      const hasValidCoords = apt.coordsX && apt.coordsY && 
                            !isNaN(parseFloat(apt.coordsX)) && 
                            !isNaN(parseFloat(apt.coordsY));
      return hasValidCoords;
    });
    
    
    if (validApartments.length === 0) {
      console.log('No valid apartments with coordinates');
      return;
    }

    
    const points = validApartments.map(apt => {
      const lat = parseFloat(apt.coordsX);
      const lng = parseFloat(apt.coordsY);
      
      return {
        type: 'Feature',
        properties: {
          id: apt.announcementId,
          apartment: apt
        },
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        }
      };
    }) as any;

    superclusterRef.current = new Supercluster({
      radius: 60,
      maxZoom: 16
    });
    
    superclusterRef.current.load(points);
    
    updateClusterMarkers();
    
    map.on('zoom', updateClusterMarkers);
    map.on('moveend', updateClusterMarkers);
  };

  const updateClusterMarkers = () => {
    if (!mapRef.current || !superclusterRef.current) return;
    
    const map = mapRef.current;
    const supercluster = superclusterRef.current;
    
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    popupsRef.current.forEach(popup => popup.remove());
    popupsRef.current = [];
    
    const bounds = map.getBounds() as any;
    const zoom = Math.floor(map.getZoom());
    
    const clusters = supercluster.getClusters(
      [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()],
      zoom
    );
    
    clusters.forEach(cluster => {
      const [longitude, latitude] = cluster.geometry.coordinates;
      
      if (cluster.properties.cluster) {
        const pointCount = cluster.properties.point_count;
        
        const el = document.createElement('div');
        let size = 'small';
        
        if (pointCount > 10) size = 'large';
        else if (pointCount > 5) size = 'medium';
        
        el.className = `${styles.clusterMarker} ${styles[size]}`;
        el.textContent = pointCount.toString();
        
        const marker = new mapboxgl.Marker(el)
          .setLngLat([longitude, latitude])
          .addTo(map);
          
        el.addEventListener('click', () => {
          const expansionZoom = supercluster.getClusterExpansionZoom(
            cluster.properties.cluster_id
          );
          map.flyTo({
            center: [longitude, latitude],
            zoom: expansionZoom + 0.5
          });
        });
        
        markersRef.current.push(marker);
      } else {
        const apartment = cluster.properties.apartment;
        
        const marker = new mapboxgl.Marker({ color: '#1AA683' })
          .setLngLat([longitude, latitude])
          .addTo(map);
          
        marker.getElement().addEventListener('click', () => {
          // Remove any existing popups to prevent multiple popups
          popupsRef.current.forEach(popup => popup.remove());
          popupsRef.current = [];
          
          const popup = new mapboxgl.Popup({
            offset: 25,
            maxWidth: '240px',
            closeButton: true,
            closeOnClick: false,
            className: styles.popup
          });
          
          popup.setLngLat([longitude, latitude]);
          
          const popupNode = document.createElement('div');
          popupNode.className = styles.mapCardWrapper;
          
          const miniCard = document.createElement('div');
          miniCard.className = styles.miniCardContent;
          miniCard.innerHTML = `
            <div class="${styles.miniCardImage}">
              <img src="${apartment.image || 'https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg'}" alt="${apartment.title || ''}" width="240" height="120" />
            </div>
            <div class="${styles.miniCardInfo}">
              <h3>${apartment.title || ''}</h3>
              <p class="${styles.miniCardAddress}"><span class="${styles.icon}">📍</span> ${apartment.address || ''}</p>
              <p class="${styles.miniCardPrice}">${apartment.cost || ''} <span class="${styles.currency}">₸</span></p>
              <a href="/apartments/${apartment.id}" class="${styles.miniCardLink}">Подробнее</a>
            </div>
          `;
          
          popupNode.appendChild(miniCard);
          
          popup.setDOMContent(popupNode);
          
          popup.addTo(map);
          popupsRef.current.push(popup);
        });
        
        markersRef.current.push(marker);
      }
    });
  };

  const clearAllSelections = () => {
    if (drawRef.current) {
      // Delete all features
      drawRef.current.deleteAll();
      
      // Clear the selected points
      setSelectedPoints([]);
      
      // Notify parent component
      if (onPointsSelected) {
        onPointsSelected([]);
      }
    }
  };

  return (
    <div className={styles.mapContainer} ref={mapContainerRef}>
      <div className={styles.mapControls}>
        <button 
          className={`${styles.drawButton} ${isDrawingMode ? styles.drawActiveButton : ''}`} 
          onClick={toggleDrawingMode}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
            <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
            <path d="M2 2l7.586 7.586"></path>
            <circle cx="11" cy="11" r="2"></circle>
          </svg>
        </button>
        <button 
          className={styles.drawButton} 
          onClick={clearAllSelections}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
            <path d="M3 6h18"></path>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Map;