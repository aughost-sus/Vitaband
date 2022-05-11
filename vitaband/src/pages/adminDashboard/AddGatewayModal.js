import {
  Box,
  Button,
  Modal,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

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

const AddGatewayModal = ({
  open,
  handleClose,
  handleSubmit,
  handleEdit,
  gateway,
}) => {
  const [gatewaySerial, setGatewaySerial] = useState("");
  const [password, setPassword] = useState("");
  const [ssid, setSsid] = useState("");
  const [endpoint, setEndpoint] = useState(
    "https://vitaband.herokuapp.com/test/postRead"
  );

  useEffect(() => {
    if (gateway) {
      setGatewaySerial(gateway.gatewaySerial);
      setPassword(gateway.password);
      setSsid(gateway.ssid);
      setEndpoint(gateway.endpoint);
    } else {
      setGatewaySerial("");
      setPassword("");
      setSsid("");
      setEndpoint("https://vitaband.herokuapp.com/test/postRead");
    }
  }, [open]);

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
            {gateway ? "Edit Gateway" : "Add Gateway"}
          </Typography>
          <TextField
            id="nodeSerial"
            label="Node Serial"
            variant="outlined"
            onChange={(e) => setGatewaySerial(e.target.value)}
            value={gatewaySerial}
            fullWidth={true}
          />
          <TextField
            id="ssid"
            label="SSID"
            variant="outlined"
            onChange={(e) => setSsid(e.target.value)}
            value={ssid}
            fullWidth={true}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            fullWidth={true}
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Typography variant="h6">{"Persistence Mode"}</Typography>
            <Switch
              edge="end"
              onChange={() => {
                let newEndpoint =
                  endpoint === "https://vitaband.herokuapp.com/test/postRead"
                    ? "https://vitaband.herokuapp.com/readings"
                    : "https://vitaband.herokuapp.com/test/postRead";
                setEndpoint(newEndpoint);
              }}
              checked={
                endpoint !== "https://vitaband.herokuapp.com/test/postRead"
              }
            />
          </Stack>
          <Button
            variant="contained"
            onClick={() => {
              if (gateway) {
                handleEdit({
                  ...gateway,
                  gatewaySerial,
                  ssid,
                  password,
                  endpoint,
                });
              } else {
                handleSubmit({
                  gatewaySerial,
                  ssid,
                  password,
                  endpoint,
                });
              }
            }}
          >
            SAVE
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddGatewayModal;
