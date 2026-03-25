'use client';

import { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockBathrooms, Bathroom } from '@/data/bathrooms';
import { MapPin, Navigation, LocateFixed } from 'lucide-react';

// Custom icons setup - Glowy blue dots as per design
const createCustomIcon = (isActive: boolean) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-6 h-6 bg-[var(--accent)] rounded-full blur-[6px] opacity-40 animate-pulse"></div>
        <div class="relative w-3.5 h-3.5 bg-[var(--accent)] rounded-full border-2 border-white shadow-[0_0_10px_rgba(0,229,255,0.8)] ${isActive ? 'scale-125 ring-4 ring-[var(--accent)]/30' : ''} transition-all duration-300"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

interface MapProps {
  onBathroomSelect?: (bathroom: Bathroom) => void;
  activeBathroomId?: string;
  zoom?: number;
}

function MapUpdater({ activeId }: { activeId?: string }) {
  const map = useMap();
  
  useEffect(() => {
    if (activeId) {
      const activeBathroom = mockBathrooms.find(b => b.id === activeId);
      if (activeBathroom) {
        map.flyTo([activeBathroom.lat, activeBathroom.lng], 16, { animate: true, duration: 1.5 });
      }
    }
  }, [activeId, map]);

  return null;
}

function LocateButton() {
  const map = useMap();
  
  const handleLocate = useCallback(() => {
    map.locate().on('locationfound', (e) => {
      map.flyTo(e.latlng, 16, { animate: true });
    });
  }, [map]);

  return (
    <button 
      onClick={handleLocate}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] bg-[var(--surface)]/90 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full flex items-center space-x-2 text-white font-bold text-sm shadow-2xl hover:bg-[var(--surface-hover)] hover:scale-105 active:scale-95 transition-all"
    >
      <LocateFixed className="w-4 h-4 text-[var(--accent)]" />
      <span>Locate Me</span>
    </button>
  );
}

export default function InteractiveMap({ onBathroomSelect, activeBathroomId, zoom = 14 }: MapProps) {
  const position: L.LatLngExpression = [48.8566, 2.3522];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-[var(--surface)] animate-pulse rounded-2xl flex items-center justify-center text-[var(--text-secondary)]">Loading Map...</div>;

  return (
    <div className="w-full h-full relative group">
      <MapContainer 
        center={position} 
        zoom={zoom} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {mockBathrooms.map((bathroom) => (
          <Marker 
            key={bathroom.id} 
            position={[bathroom.lat, bathroom.lng]}
            icon={createCustomIcon(activeBathroomId === bathroom.id)}
            eventHandlers={{
              click: () => onBathroomSelect && onBathroomSelect(bathroom),
            }}
          />
        ))}

        <MapUpdater activeId={activeBathroomId} />
        <LocateButton />
      </MapContainer>

      {/* Adding custom css for the map layout */}
      <style dangerouslySetInnerHTML={{__html: `
        .leaflet-container {
          background-color: #0B132A;
          font-family: inherit;
        }
        .leaflet-control-attribution {
          display: none;
        }
        .leaflet-marker-icon {
          background: transparent !important;
          border: none !important;
        }
      `}} />
    </div>
  );
}
