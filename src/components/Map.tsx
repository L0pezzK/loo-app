'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockBathrooms, Bathroom } from '@/data/bathrooms';
import { MapPin, Navigation } from 'lucide-react';

// Custom icons setup since default leaflet icons often break in Next.js
const createCustomIcon = (isOpen: boolean) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${isOpen ? '#00E5FF' : '#FF5252'}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid #1A233A; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
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
        map.flyTo([activeBathroom.lat, activeBathroom.lng], 16, { animate: true });
      }
    }
  }, [activeId, map]);

  return null;
}

export default function InteractiveMap({ onBathroomSelect, activeBathroomId, zoom = 14 }: MapProps) {
  // Center of Paris
  const position: L.LatLngExpression = [48.8566, 2.3522];
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-[var(--surface)] animate-pulse rounded-2xl flex items-center justify-center text-[var(--text-secondary)]">Loading Map...</div>;

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative">
      <MapContainer 
        center={position} 
        zoom={zoom} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {mockBathrooms.map((bathroom) => (
          <Marker 
            key={bathroom.id} 
            position={[bathroom.lat, bathroom.lng]}
            icon={createCustomIcon(bathroom.isOpen)}
            eventHandlers={{
              click: () => onBathroomSelect && onBathroomSelect(bathroom),
            }}
          >
            {/* Small popup just for basic info, full details in sidebar or card */}
            <Popup className="loo-popup">
              <div className="font-sans">
                <p className="font-bold text-gray-900 mb-1">{bathroom.name}</p>
                <p className={`text-xs font-semibold ${bathroom.isOpen ? 'text-green-600' : 'text-red-600'} mb-2`}>
                  {bathroom.isOpen ? 'Open Now' : 'Closed'}
                </p>
                <p className="text-xs text-gray-600 mb-1">{bathroom.distance}m away</p>
              </div>
            </Popup>
          </Marker>
        ))}

        <MapUpdater activeId={activeBathroomId} />
      </MapContainer>

      {/* Adding custom css for the popup specifically within leaflet to match theme slightly better */}
      <style dangerouslySetInnerHTML={{__html: `
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 4px;
        }
        .leaflet-container {
          background-color: var(--surface);
          font-family: inherit;
        }
        .leaflet-control-attribution {
          background: rgba(11, 19, 42, 0.7) !important;
          color: #8a94a6 !important;
        }
        .leaflet-control-attribution a {
          color: #00E5FF !important;
        }
      `}} />
    </div>
  );
}
