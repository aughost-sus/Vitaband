import {
  Box,
  Button,
  Modal,
  Stack,
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

const AddNodeModal = ({
  open,
  handleClose,
  handleSubmit,
  handleEdit,
  node,
}) => {
  const [nodeSerial, setNodeSerial] = useState("");

  useEffect(() => {
    if (node) {
      setNodeSerial(node.nodeSerial);
    } else {
      setNodeSerial("");
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
            {node ? "Edit Node" : "Add Node"}
          </Typography>
          <TextField
            id="nodeSerial"
            label="Node Serial"
            variant="outlined"
            onChange={(e) => setNodeSerial(e.target.value)}
            value={nodeSerial}
            fullWidth={true}
          />
          <Button
            variant="contained"
            onClick={() => {
              if (node) {
                handleEdit({ ...node, nodeSerial });
              } else {
                handleSubmit({ nodeSerial, patient: {} });
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

export default AddNodeModal;
