import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { MAP_API } from "../utils/constants";
import { Check, LocationOnRounded } from "@mui/icons-material";

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
        <Marker
          position={props.nodeCoordinates}
          onMouseOver={() => props.setShowAddressInfo(true)}
          onMouseOut={() => props.setShowAddressInfo(false)}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
        >
          {props.showAddressInfo && (
            <InfoWindow onCloseClick={() => props.setShowAddressInfo(false)}>
              <div>Current Node Location</div>
            </InfoWindow>
          )}
        </Marker>
        <Marker
          position={props.addressCoordinates}
          onMouseOver={() => props.setShowPatientInfo(true)}
          onMouseOut={() => props.setShowPatientInfo(false)}
        >
          {props.showPatientInfo && (
            <InfoWindow onCloseClick={() => props.setShowPatientInfo(false)}>
              <div>Patient Address</div>
            </InfoWindow>
          )}
        </Marker>
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
