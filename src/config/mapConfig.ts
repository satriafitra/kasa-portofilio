export interface MapConfig {
  latitude: number;
  longitude: number;
  zoom: number;
  minZoom: number;
  maxZoom: number;
  locationName: string;
  region: string;
  country: string;
  coordinatesFormatted: string;
  osmTileUrl: string;
  attribution: string;
  externalLinks: {
    osm: string;
    googleMaps: string;
  };
}

export const MAP_CONFIG: MapConfig = {
  latitude: -6.820762,
  longitude: 107.142960,
  zoom: 15,
  minZoom: 6,
  maxZoom: 19,
  locationName: 'Cianjur',
  region: 'Jawa Barat',
  country: 'Indonesia',
  coordinatesFormatted: '6° 49\' 14.7" S, 107° 8\' 34.6" E',
  // Official OpenStreetMap tile server (Free, no watermark, no API key required)
  osmTileUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
  externalLinks: {
    osm: 'https://www.openstreetmap.org/?mlat=-6.820762&mlon=107.142960#map=16/-6.820762/107.142960',
    googleMaps: 'https://www.google.com/maps/search/?api=1&query=-6.820762,107.142960'
  }
};
