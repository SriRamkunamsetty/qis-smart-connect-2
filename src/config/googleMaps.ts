export const GOOGLE_LIBRARIES: ("places" | "drawing" | "geometry" | "visualization")[] = ["places"];

export const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

// Campus location - QIS College of Engineering & Technology, Ongole
export const CAMPUS_CENTER = {
  lat: 15.5057,
  lng: 80.0499,
};

export const MAP_DEFAULT_ZOOM = 15;

// Map configuration for Antigravity compatibility
export const mapConfig = {
  apiKey: MAPS_API_KEY,
  center: CAMPUS_CENTER,
  zoom: MAP_DEFAULT_ZOOM,
  libraries: GOOGLE_LIBRARIES,
};
