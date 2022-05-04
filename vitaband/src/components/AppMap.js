import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { MAP_API } from "../utils/constants";

const AppMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${MAP_API}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    onClick={props.onMapClick}
    defaultZoom={12}
    defaultCenter={props.target}
  >
    {props.isMarkerShown && !props.isPicker && (
      <>
        <Marker position={props.nodeCoordinates}/>
        <Marker
          position={
            props.addressCoordinates
              ? { lat: 14.830121812143584, lng: 120.80162571435547 }
              : null
          }
        />
      </>
    )}
    {props.isMarkerShown && props.isPicker && (
      <>
        <Marker position={props.target} />
      </>
    )}
  </GoogleMap>
));

export default AppMap;
