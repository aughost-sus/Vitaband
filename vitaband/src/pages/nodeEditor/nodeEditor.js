import { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/navbar";
import "./nodeEditor.css";
import API from "../../utils/API";
import { Box, Button, Container, Grid } from "@mui/material";
import { SnackbarContext } from "../../shared/contexts/SnackbarContext";
import { LoadingContext } from "../../shared/contexts/LoadingContext";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeftRounded, LocationOnRounded } from "@mui/icons-material";
import MapModal from "./MapModal";

const NodeEditor = () => {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState({
    lat: 14.830121812143584,
    lng: 120.80162571435547,
  });
  const [patient, setPatient] = useState({
    lastname: "",
    firstname: "",
    age: "",
    address: "",
    contactNo: "",
    isMale: true
  });
  const [nodeSerial, setNodeSerial] = useState("");
  const [isNew, setIsNew] = useState(true);
  const { snackbarDispatch } = useContext(SnackbarContext);
  const { loadingDispatch } = useContext(LoadingContext);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state !== null) {
      setIsNew(state.isNew);
      console.log(state);
      if (!state.isNew) {
        setNodeSerial(state.nodeSerial);
        if (state && state.patient) {
          setPatient({
            lastname: state.patient.lastname,
            firstname: state.patient.firstname,
            age: state.patient.age,
            address: state.patient.address,
            contactNo: state.patient.contactNo,
            isMale: state.patient.isMale
          });
        }
      }
    }
    if (
      state &&
      state.patient &&
      state.patient.latitude &&
      state.patient.longitude
    ) {
      setLocation({
        lat: state.patient.latitude,
        lng: state.patient.longitude,
      });
    }
  }, []);

  const checkPatient = (e) => {
    if (
      e.target.firstname.value !== "" &&
      e.target.lastname.value !== "" &&
      e.target.age.value !== "" &&
      e.target.contactNo.value !== "" &&
      e.target.address.value !== ""
    ) {
      return {
        firstname: e.target.firstname.value,
        lastname: e.target.lastname.value,
        age: +e.target.age.value,
        address: e.target.address.value,
        contactNo: e.target.contactNo.value,
        isMale: e.target.sex.value === "Male",
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      return {};
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isNew) {
      await API.addNode(
        {
          nodeSerial,
          patient: checkPatient(e),
        },
        loadingDispatch,
        snackbarDispatch,
        () => navigate("/homepage")
      );
    } else {
      await API.editNode(
        {
          nodeSerial,
          patient: checkPatient(e),
          _id: state.nodeId,
        },
        loadingDispatch,
        snackbarDispatch,
        () => navigate("/homepage")
      );
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const locationHandler = (coor) => {
    setLocation(coor);
    handleClose();
  };

  return (
    <Box>
      <Navbar />
      <Container>
        <Button
          startIcon={<ChevronLeftRounded />}
          onClick={() => navigate("/homepage")}
        >
          Back to Home
        </Button>
        <span className="heading">{`${isNew ? "Add" : "Link"} a Node`}</span>
        <hr className="line" />
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} align="center">
            <div className="form-input" style={{ justifyContent: "center" }}>
              <div>Node ID:</div>
              <input
                name="nodeSerial"
                className="node-form-field"
                placeholder="Node Serial"
                style={{ flexGrow: "initial" }}
                onChange={(e) => setNodeSerial(e.target.value)}
                value={nodeSerial}
              />
            </div>
            <Box className="box1" sx={{ height: { sm: "20vh", md: "60vh" } }}>
              <div>NODE</div>
              <Box
                sx={{
                  justifyContent: "center",
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: "8rem",
                  color: "white",
                  paddingBottom: { sm: "0rem", md: "8rem" },
                }}
              >
                {nodeSerial}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <div className="patinf">Patient Information</div>
            <form className="editor-form" onSubmit={submitHandler}>
              <div className="form-input">
                <div>Name:</div>
                <div style={{ flexGrow: 1, display: "flex", flexWrap: "wrap" }}>
                  <input
                    className="node-form-field"
                    placeholder=" Surname"
                    name="lastname"
                    value={patient.lastname}
                    onChange={(e) => setPatient((patient) => ({...patient, lastname: e.target.value}))}
                  />
                  <input
                    className="node-form-field"
                    placeholder=" First Name"
                    name="firstname"
                    value={patient.firstname}
                    onChange={(e) => setPatient((patient) => ({...patient, firstname: e.target.value}))}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <div className="form-input">
                  <div>Age:</div>
                  <input
                    type="number"
                    className="node-form-field"
                    placeholder="Age"
                    name="age"
                    value={patient.age}
                    onChange={(e) => setPatient((patient) => ({...patient, age: e.target.value}))}
                  />
                </div>
                <div className="form-input">
                  <div>Sex:</div>
                  <input
                    name="sex"
                    type="radio"
                    className="radio-input"
                    id="male"
                    value="Male"
                    checked={patient.isMale}
                    onChange={(e) => setPatient((patient) => ({...patient, isMale: e.target.value === 'Male'}))}
                  />
                  <label for="male">Male</label>
                  <input
                    name="sex"
                    type="radio"
                    className="radio-input"
                    id="female"
                    value="Female"
                    checked={!patient.isMale}
                    onChange={(e) => setPatient((patient) => ({...patient, isMale: e.target.value === 'Male'}))}
                  />
                  <label for="female">Female</label>
                </div>
              </div>
              <div className="form-input">
                <div>Complete Address:</div>
                <input
                  className="node-form-field"
                  placeholder="Complete Address"
                  name="address"
                  value={patient.address}
                  onChange={(e) => setPatient((patient) => ({...patient, address: e.target.value}))}
                />
              </div>
              <div className="form-input">
                <div>Contact No:</div>
                <input
                  type="number"
                  className="node-form-field"
                  placeholder="Contact No"
                  name="contactNo"
                  value={patient.contactNo}
                  onChange={(e) => setPatient((patient) => ({...patient, contactNo: e.target.value}))}
                />
              </div>
              <div className="form-input">
                <div style={{ marginRight: "1rem" }}>Locate:</div>
                <Button startIcon={<LocationOnRounded />} onClick={handleOpen}>
                  Locate
                </Button>
              </div>
              <input type="submit" className="linkbtn" />
            </form>
          </Grid>
        </Grid>
      </Container>
      <MapModal
        open={open}
        handleClose={handleClose}
        locationHandler={locationHandler}
        location={location}
      />
    </Box>
  );
};

export default NodeEditor;
