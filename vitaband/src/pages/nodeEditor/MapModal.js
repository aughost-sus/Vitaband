import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppMap from "../../components/AppMap";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "1rem",
  p: 4,
};

const MapModal = ({ open, handleClose, locationHandler, location }) => {
  const [localLocation, setLocalLocation] = useState({
    lat: 14.830121812143584,
    lng: 120.80162571435547,
  });

  const localLocationHandler = (ev) => {
    console.log({ lat: ev.latLng.lat(), lng: ev.latLng.lng() });
    setLocalLocation({ lat: ev.latLng.lat(), lng: ev.latLng.lng() });
  };

  useEffect(() => {
    setLocalLocation(location);
  }, [location, open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h6" align="center">
            Choose Location
          </Typography>
          <div
            style={{
              width: "100%",
              height: "30vh",
              backgroundColor: "cornflowerblue",
            }}
          >
            <AppMap
              isPicker={true}
              target={localLocation}
              isMarkerShown={true}
              onMapClick={localLocationHandler}
            />
          </div>
          <Button onClick={() => locationHandler(localLocation)}>
            Confirm Location
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default MapModal;
