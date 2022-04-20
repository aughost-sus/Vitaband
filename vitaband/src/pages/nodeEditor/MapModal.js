import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MapContainer from "../../components/MapContainer";

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
            <MapContainer />
          </div>
          <Button onClick={locationHandler}>Confirm Location</Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default MapModal;
