import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
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

const AddNodeModal = ({ open, handleClose, handleSubmit }) => {
  const [nodeSerial, setNodeSerial] = useState("");
  const [patient, setPatient] = useState({});

  useEffect(() => {
    setNodeSerial("");
    setPatient({});
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
            Add Node
          </Typography>
          <TextField
            id="nodeSerial"
            label="Node Serial"
            variant="outlined"
            onChange={(e) => setNodeSerial(e.target.value)}
            value={nodeSerial}
            fullWidth={true}
          />
          <TextField
            id="firstname"
            label="First Name"
            variant="outlined"
            onChange={(e) =>
              setPatient({ ...patient, firstname: e.target.value })
            }
            value={patient.firstname}
            fullWidth={true}
          />
          <TextField
            id="lastname"
            label="Last Name"
            variant="outlined"
            onChange={(e) =>
              setPatient({ ...patient, lastname: e.target.value })
            }
            value={patient.lastname}
            fullWidth={true}
          />
          <TextField
            id="age"
            label="Age"
            variant="outlined"
            type="number"
            onChange={(e) => setPatient({ ...patient, age: e.target.value })}
            value={patient.age}
            fullWidth={true}
          />
          <TextField
            id="address"
            label="Address"
            variant="outlined"
            onChange={(e) =>
              setPatient({ ...patient, address: e.target.value })
            }
            value={patient.address}
            fullWidth={true}
          />
          <TextField
            id="contactNo"
            label="Contact No."
            variant="outlined"
            onChange={(e) =>
              setPatient({ ...patient, contactNo: e.target.value })
            }
            value={patient.contactNo}
            fullWidth={true}
          />
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={patient.isMale}
            onChange={(e) =>
              setPatient({ ...patient, isMale: e.target.value })
            }
          >
            <FormControlLabel value={true} control={<Radio />} label="Male" />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
          <Button
            variant="contained"
            onClick={() =>
              handleSubmit({
                nodeSerial,
                patient,
              })
            }
          >
            SAVE
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddNodeModal;
