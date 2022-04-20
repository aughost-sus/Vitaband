import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <h1>{text}</h1>;

const MapContainer = ({ center, zoom }) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCzxkcy5AovcL6ygmqWkkKLKmlwtE3X_Kw" }}
        defaultCenter={{
          lat: 14,
          lng: 120,
        }}
        defaultZoom={11}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};

export default MapContainer;
