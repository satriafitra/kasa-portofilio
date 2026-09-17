import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MAP_CONFIG } from '../../config/mapConfig';
import { soundFx } from '../../services/sound';

export const OpenStreetMapCard: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [MAP_CONFIG.latitude, MAP_CONFIG.longitude],
      zoom: MAP_CONFIG.zoom,
      minZoom: MAP_CONFIG.minZoom,
      maxZoom: MAP_CONFIG.maxZoom,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    // Official OpenStreetMap tile layer
    L.tileLayer(MAP_CONFIG.osmTileUrl, {
      attribution: MAP_CONFIG.attribution,
      maxZoom: MAP_CONFIG.maxZoom,
    }).addTo(map);

    // Custom Minimal Yellow Dot Marker
    const customIcon = L.divIcon({
      className: 'custom-osm-pin',
      html: `
        <div class="osm-pin-wrapper">
          <div class="osm-pin-ripple"></div>
          <div class="osm-pin-dot"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -14],
    });

    const marker = L.marker([MAP_CONFIG.latitude, MAP_CONFIG.longitude], {
      icon: customIcon,
      title: 'Lokasi Satria Fitra',
    }).addTo(map);

    marker.bindPopup(`
      <div style="font-family: 'Poppins', sans-serif; color: #0f172a; padding: 2px;">
        <strong style="font-size: 0.85rem; color: #0f172a; display: block; margin-bottom: 2px;">
          Lokasi Satria Fitra
        </strong>
        <p style="font-size: 0.775rem; color: #475569; margin: 0 0 3px 0;">
          ${MAP_CONFIG.locationName}, ${MAP_CONFIG.region}
        </p>
        <span style="font-family: monospace; font-size: 0.7rem; color: #64748b;">
          ${MAP_CONFIG.coordinatesFormatted}
        </span>
      </div>
    `);

    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const handleResetView = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([MAP_CONFIG.latitude, MAP_CONFIG.longitude], MAP_CONFIG.zoom, {
        duration: 1,
      });
    }
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    mapInstanceRef.current?.zoomOut();
  };

  return (
    <div className="osm-card-container">
      {/* Header - Simple, clean, no redundant icons */}
      <div className="osm-card-header">
        <div className="osm-header-title">
          <span className="osm-label-tag">LOKASI</span>
          <span className="osm-location-name">{MAP_CONFIG.locationName}, {MAP_CONFIG.region}</span>
        </div>

        <button
          type="button"
          onClick={handleResetView}
          className="osm-control-btn"
          title="Pusatkan kembali ke lokasi rumah"
        >
          Reset
        </button>
      </div>

      {/* Map Viewport */}
      <div className="osm-map-viewport">
        <div ref={mapContainerRef} className="osm-map-canvas" />

        {/* Minimal Zoom Controls */}
        <div className="osm-floating-controls">
          <button
            type="button"
            onClick={handleZoomIn}
            className="osm-zoom-btn"
            title="Zoom In"
            aria-label="Perbesar"
          >
            +
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="osm-zoom-btn"
            title="Zoom Out"
            aria-label="Perkecil"
          >
            &minus;
          </button>
        </div>
      </div>

      {/* Footer - Minimal text links */}
      <div className="osm-card-footer">
        <span className="osm-footer-coords">
          {MAP_CONFIG.coordinatesFormatted}
        </span>

        <div className="osm-footer-links">
          <a
            href={MAP_CONFIG.externalLinks.osm}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFx.playClick()}
            className="osm-link-text"
          >
            OpenStreetMap ↗
          </a>
          <span className="osm-link-sep">&bull;</span>
          <a
            href={MAP_CONFIG.externalLinks.googleMaps}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFx.playClick()}
            className="osm-link-text"
          >
            Google Maps ↗
          </a>
        </div>
      </div>

      {/* Scoped CSS */}
      <style>{`
        .osm-card-container {
          background: #14141a;
          border: 1px solid var(--m-border);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.65);
          display: flex;
          flex-direction: column;
          transition: border-color 0.2s ease;
        }

        .osm-card-container:hover {
          border-color: rgba(250, 204, 21, 0.3);
        }

        .osm-card-header {
          padding: 0.85rem 1.25rem;
          background: #121217;
          border-bottom: 1px solid var(--m-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .osm-header-title {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .osm-label-tag {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--m-yellow);
          background: rgba(250, 204, 21, 0.08);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          letter-spacing: 0.05em;
        }

        .osm-location-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: #fff;
        }

        .osm-control-btn {
          background: transparent;
          border: 1px solid var(--m-border);
          border-radius: 5px;
          padding: 0.25rem 0.65rem;
          font-family: inherit;
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--m-text-sub);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .osm-control-btn:hover {
          color: #fff;
          border-color: rgba(255, 255, 255, 0.25);
        }

        .osm-map-viewport {
          position: relative;
          width: 100%;
          height: 220px;
          background: #0d0d12;
        }

        .osm-map-canvas {
          width: 100%;
          height: 100%;
          background: #0d0d12;
        }

        .osm-map-canvas .leaflet-tile-pane {
          filter: invert(100%) hue-rotate(180deg) brightness(92%) contrast(90%);
        }

        .leaflet-container {
          font-family: 'Poppins', sans-serif !important;
          background: #0d0d12 !important;
        }

        /* Minimal Pin */
        .custom-osm-pin {
          background: transparent;
          border: none;
        }

        .osm-pin-wrapper {
          position: relative;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .osm-pin-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #facc15;
          border: 2px solid #000;
          box-shadow: 0 0 10px rgba(250, 204, 21, 0.8);
          z-index: 2;
        }

        .osm-pin-ripple {
          position: absolute;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(250, 204, 21, 0.35);
          animation: osmPulse 2s ease-out infinite;
          z-index: 1;
        }

        @keyframes osmPulse {
          0% { transform: scale(0.6); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        .osm-floating-controls {
          position: absolute;
          right: 0.75rem;
          top: 0.75rem;
          z-index: 500;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .osm-zoom-btn {
          width: 26px;
          height: 26px;
          border-radius: 5px;
          background: rgba(18, 18, 25, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #fff;
          font-size: 1rem;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }

        .osm-zoom-btn:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .osm-card-footer {
          padding: 0.75rem 1.25rem;
          background: #121217;
          border-top: 1px solid var(--m-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .osm-footer-coords {
          color: var(--m-text-muted);
          font-family: monospace;
          font-size: 0.72rem;
        }

        .osm-footer-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .osm-link-text {
          color: var(--m-text-sub);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.15s ease;
        }

        .osm-link-text:hover {
          color: var(--m-yellow);
        }

        .osm-link-sep {
          color: var(--m-border);
        }
      `}</style>
    </div>
  );
};
