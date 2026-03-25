'use client';

import { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockBathrooms, Bathroom } from '@/data/bathrooms';
import { MapPin, Navigation, LocateFixed, Circle } from 'lucide-react';

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

// User location icon
const createUserIcon = () => {
  return L.divIcon({
    className: 'user-icon',
    html: `
      <div class="relative flex flex-col items-center">
        <div class="w-10 h-10 bg-[var(--accent)]/20 rounded-full border-2 border-[var(--accent)] flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.4)]">
          <div class="w-3 h-3 bg-[var(--accent)] rounded-full border-2 border-white"></div>
        </div>
        <div class="mt-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-black text-white uppercase tracking-widest border border-white/10">YOU</div>
      </div>
    `,
    iconSize: [40, 60],
    iconAnchor: [20, 50],
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
  const userPosition: L.LatLngExpression = [48.8450, 2.3300]; // Mock user position
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeBathroom = mockBathrooms.find(b => b.id === activeBathroomId);

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
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {/* User Marker */}
        <Marker position={userPosition} icon={createUserIcon()} />

        {/* Route Line */}
        {activeBathroom && (
          <Polyline 
            positions={[userPosition, [activeBathroom.lat, activeBathroom.lng]]} 
            color="#6366f1" 
            dashArray="10, 15" 
            weight={4}
            opacity={0.8}
          />
        )}

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
          background-color: #f3f4f6;
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
