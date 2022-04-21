const LS_USER_DATA = "userData";
const TOKEN_EXPIRATION = new Date(new Date().getTime() + 1000 * 60 * 60);
const API_URL = "https://vitaband.herokuapp.com";
const MAP_API = "AIzaSyBCIJfldUcipchlxKIfyinkd1JAbpVf60I";
// const API_URL = "http://localhost:8000";
const MAP_SETTINGS = {
  DEFAULT_MAP_OPTIONS: {
    scrollwheel: false,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
  },
  DEFAULT_CENTER: { lat: 14, lng: 120 },
  DEFAULT_ZOOM: 4,
  MARKER_SIZE: 35,
  PIXEL_OFFSET: {
    MARKER: {
      X: 0,
      Y: -35,
    },
  },
  DIRECTIONS_OPTIONS: { suppressMarkers: true, preserveViewport: true },
};

export { LS_USER_DATA, TOKEN_EXPIRATION, API_URL, MAP_SETTINGS, MAP_API };
