import React, { useContext, useEffect } from "react";
import Navbar from "../Navbar/navbar";
import "../node-details/nodedetails.css";
import LineChart from "../../components/linechart";
import { useState } from "react";
import API from "../../utils/API";
import { useSocket } from "../../shared/hooks/useSocket";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SnackbarContext } from "../../shared/contexts/SnackbarContext";
import { LoadingContext } from "../../shared/contexts/LoadingContext";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  CardHeader,
  Typography,
} from "@mui/material";
import {
  Battery90Rounded,
  ChevronLeftRounded,
  DeleteForeverRounded,
  EditRounded,
  LinkRounded,
} from "@mui/icons-material";
import { DateTime } from "luxon";
import AppMap from "../../components/AppMap";

const Nodedetails = () => {
  const { snackbarDispatch } = useContext(SnackbarContext);
  const { loadingDispatch } = useContext(LoadingContext);
  const navigate = useNavigate();
  const [node, setNode] = useState(null);
  const [vital, setVital] = useState("temperature");
  const [readings, setReadings] = useState([]);
  const { nodeId } = useParams();
  const { state } = useLocation();
  const [trigger, setTrigger] = useState(false);
  const [showAddressInfo, setShowAddressInfo] = useState(false);
  const [showPatientInfo, setShowPatientInfo] = useState(false);

  const formatData = () => {
    let labels = [];
    let data = [];
    readings.forEach((reading) => {
      const date = DateTime.fromISO(reading.datetime);
      labels.push(date.toLocaleString(DateTime.DATETIME_MED));
      data.push(reading[vital]);
    });
    return {
      labels,
      datasets: [
        {
          label: vital,
          data,
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    };
  };

  const isActive = () => {
    if (readings.length !== 0) {
      if (Math.abs(new Date() - new Date(readings.at(-1).datetime)) < 6000) {
        return true;
      }
    }
    return false;
  };

  const checkTemperature = (temp) => {
    if (temp > 38) return { label: "High Body Temperature", control: true };
    if (temp < 36) return { label: "Low Body Temperature", control: true };
    return { label: "", control: false };
  };

  const checkSpo2 = (spo2) => {
    if (spo2 < 95) return { label: "Below Normal", control: true };
    return { label: "", control: false };
  };

  const checkHeartRate = (hr) => {
    if (hr > 100) return { label: "High Heart beat", control: true };
    if (hr < 60) return { label: "Low Heart beat", control: true };
    return { label: "", control: false };
  };

  const checkCough = (cf) => {
    if (cf > 5) return { label: "Frequent coughs", control: true };
    return { label: "", control: false };
  };

  const isWear = () => {
    if (readings.length !== 0) {
      if (readings.at(-1).ir > 30000) {
        return true;
      }
    }
    return false;
  };

  const degreesToRadians = (degrees) => {
    return (degrees * Math.PI) / 180;
  };

  const distanceInKmBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  };

  useEffect(() => {
    API.getNode(
      nodeId,
      setNode,
      setReadings,
      loadingDispatch,
      snackbarDispatch
    );
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setTrigger(!trigger);
    }, 8 * 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [readings]);

  const socketHandler = (data) => {
    setReadings((readings) => {
      let newReadings = [...readings];
      if (newReadings.length === 15) {
        newReadings.shift();
      }
      newReadings.push(data.reading);
      return newReadings;
    });
  };

  const unlinkHandler = async () => {
    await API.editNode(
      {
        nodeSerial: node.nodeSerial,
        patient: null,
        _id: nodeId,
      },
      loadingDispatch,
      snackbarDispatch,
      () => navigate("/homepage")
    );
  };

  useSocket(state?.nodeSerial, socketHandler);

  return (
    <motion.div
      className="whole"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box>
        <Navbar />
        <Container sx={{ marginBottom: "2rem" }}>
          <Stack direction="row" justifyContent="space-between">
            <Button
              startIcon={<ChevronLeftRounded />}
              onClick={() => navigate("/homepage")}
            >
              Back to Home
            </Button>
            {node && node.patient && (
              <>
                <Button
                  startIcon={<EditRounded />}
                  onClick={() =>
                    navigate(`/editnode`, {
                      state: {
                        isNew: false,
                        nodeSerial: node.nodeSerial,
                        nodeId,
                        patient: node.patient,
                      },
                    })
                  }
                >
                  Edit Node
                </Button>
                <Button
                  onClick={unlinkHandler}
                  startIcon={<DeleteForeverRounded />}
                >
                  Remove Patient
                </Button>
              </>
            )}
            {node && !node.patient && (
              <Button
                startIcon={<LinkRounded />}
                onClick={() =>
                  navigate(`/linknode`, {
                    state: {
                      isNew: false,
                      nodeSerial: node.nodeSerial,
                      nodeId,
                      patient: null,
                    },
                  })
                }
              >
                Link Patient
              </Button>
            )}
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="status-bar">
                <div className="status">
                  <div
                    className="indicator"
                    style={{ background: isActive() ? "Chartreuse" : "red" }}
                  />
                  <span>{isActive() ? "ACTIVE " : "OFFLINE "}</span>
                  <span>{isWear() ? "" : isActive() ? " - NOT WORN" : ""}</span>
                </div>
                <div className="nodename">
                  {node && (
                    <Stack direction="column" justifyContent="center">
                      <span>{`NODE ${node.nodeSerial}`}</span>
                      {readings.length !== 0 && (
                        <Stack
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Battery90Rounded />
                          <p>{`${readings.at(-1).battery} %`}</p>
                        </Stack>
                      )}
                    </Stack>
                  )}
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              {node && node.patient && (
                <Box
                  sx={{ paddingLeft: { xs: "0rem", sm: "4rem" } }}
                  className="patient-details"
                >
                  <p>Linked Patient Information:</p>
                  <h1>{`${node.patient.lastname}, ${node.patient.firstname}`}</h1>
                  <span>Complete Address:</span>
                  <p id="address">{node.patient.address}</p>
                  <p id="address">
                    Sex:{" "}
                    <span id="address">
                      {node.patient.isMale ? "Male" : "Female"}
                    </span>
                  </p>
                  <p id="address1">
                    Age: <span id="address1">{node.patient.age} Years old</span>
                  </p>
                </Box>
              )}
              {node && !node.patient && (
                <Box
                  sx={{
                    paddingLeft: { xs: "0rem", sm: "4rem" },
                    margin: "2rem 0",
                  }}
                >
                  <h1>No Patient Associated</h1>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {node && node.patient && readings.length !== 0 && (
                <>
                  <Card
                    sx={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "1rem",
                      minHeight: "15rem",
                    }}
                  >
                    <AppMap
                      isPicker={false}
                      isMarkerShown={true}
                      target={{
                        lat: readings.at(-1).lat,
                        lng: readings.at(-1).lng,
                      }}
                      nodeCoordinates={{
                        lat: readings.at(-1).lat,
                        lng: readings.at(-1).lng,
                      }}
                      addressCoordinates={
                        node.patient.longitude && node.patient.latitude
                          ? {
                              lat: node.patient.latitude,
                              lng: node.patient.longitude,
                            }
                          : null
                      }
                      showPatientInfo={showPatientInfo}
                      showAddressInfo={showAddressInfo}
                      setShowAddressInfo={setShowAddressInfo}
                      setShowPatientInfo={setShowPatientInfo}
                      onMapClick={(ev) => {}}
                    />
                  </Card>
                  <div
                    className={`map-interpretation ${
                      distanceInKmBetweenEarthCoordinates(
                        readings.at(-1).lat,
                        readings.at(-1).lng,
                        node.patient.latitude,
                        node.patient.longitude
                      ) > 0.03
                        ? "alert-background"
                        : ""
                    }`}
                  >
                    <div>{`Displacement: ${Math.round(
                      distanceInKmBetweenEarthCoordinates(
                        readings.at(-1).lat,
                        readings.at(-1).lng,
                        node.patient.latitude,
                        node.patient.longitude
                      ) * 1000
                    )} m`}</div>
                    {distanceInKmBetweenEarthCoordinates(
                      readings.at(-1).lat,
                      readings.at(-1).lng,
                      node.patient.latitude,
                      node.patient.longitude
                    ) > 0.03 && (
                      <div>Patient is out of designated location</div>
                    )}
                  </div>
                </>
              )}
              {node && node.patient && readings.length === 0 && (
                <Card
                  sx={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "1rem",
                    minHeight: "15rem",
                  }}
                >
                  <AppMap
                    isPicker={false}
                    isMarkerShown={true}
                    target={{
                      lat: node.patient.latitude,
                      lng: node.patient.longitude,
                    }}
                    nodeCoordinates={{
                      lat: node.patient.latitude,
                      lng: node.patient.longitude,
                    }}
                    addressCoordinates={
                      node.patient.longitude && node.patient.latitude
                        ? {
                            lat: node.patient.latitude,
                            lng: node.patient.longitude,
                          }
                        : null
                    }
                    showPatientInfo={showPatientInfo}
                    showAddressInfo={showAddressInfo}
                    setShowAddressInfo={setShowAddressInfo}
                    setShowPatientInfo={setShowPatientInfo}
                    onMapClick={(ev) => {}}
                  />
                </Card>
              )}
              {node && !node.patient && readings.length !== 0 && (
                <Card
                  sx={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "1rem",
                    minHeight: "15rem",
                  }}
                >
                  <AppMap
                    isPicker={false}
                    isMarkerShown={true}
                    target={{
                      lat: readings.at(-1).lat,
                      lng: readings.at(-1).lng,
                    }}
                    nodeCoordinates={{
                      lat: readings.at(-1).lat,
                      lng: readings.at(-1).lng,
                    }}
                    addressCoordinates={null}
                    showPatientInfo={showPatientInfo}
                    showAddressInfo={showAddressInfo}
                    setShowAddressInfo={setShowAddressInfo}
                    setShowPatientInfo={setShowPatientInfo}
                    onMapClick={(ev) => {}}
                  />
                </Card>
              )}
              {node && !node.patient && readings.length === 0 && (
                <Card
                  sx={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "1rem",
                    minHeight: "15rem",
                  }}
                >
                  <AppMap
                    isPicker={false}
                    isMarkerShown={true}
                    target={{
                      lat: 14.8533996,
                      lng: 120.814692,
                    }}
                    nodeCoordinates={null}
                    addressCoordinates={null}
                    showPatientInfo={showPatientInfo}
                    showAddressInfo={showAddressInfo}
                    setShowAddressInfo={setShowAddressInfo}
                    setShowPatientInfo={setShowPatientInfo}
                    onMapClick={(ev) => {}}
                  />
                </Card>
              )}
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{ paddingLeft: { xs: "0rem", sm: "4rem" } }}
                className="vitals"
              >
                <p>HEALTH VITALS:</p>
              </Box>
            </Grid>
            {readings.length !== 0 && (
              <>
                <Grid item xs={6} md={3}>
                  <div
                    className={`vital_box ${
                      checkTemperature(readings.at(-1).temperature).control
                        ? "alert-background"
                        : ""
                    }`}
                    onClick={() => setVital("temperature")}
                  >
                    <h3>TEMPERATURE:</h3>
                    <span>
                      {readings.at(-1).temperature === -999
                        ? "Reading..."
                        : `${readings.at(-1).temperature} °C`}{" "}
                    </span>
                    <h3>
                      {checkTemperature(readings.at(-1).temperature).label}
                    </h3>
                  </div>
                </Grid>
                <Grid item xs={6} md={3}>
                  <div
                    className={`vital_box ${
                      checkSpo2(readings.at(-1).spo2).control
                        ? "alert-background"
                        : ""
                    }`}
                    onClick={() => setVital("spo2")}
                  >
                    <h3>OXYGEN LEVEL:</h3>
                    <span>
                      {readings.at(-1).spo2 === -999
                        ? "Reading..."
                        : `${Math.round(readings.at(-1).spo2)} %`}
                    </span>
                    <h3>{checkSpo2(readings.at(-1).spo2).label}</h3>
                  </div>
                </Grid>
                <Grid item xs={6} md={3}>
                  <div
                    className={`vital_box ${
                      checkHeartRate(readings.at(-1).heartRate).control
                        ? "alert-background"
                        : ""
                    }`}
                    onClick={() => setVital("heartRate")}
                  >
                    <h3>HEART RATE:</h3>
                    <span>{`${readings.at(-1).heartRate} BPM`}</span>
                    <h3>{checkHeartRate(readings.at(-1).heartRate).label}</h3>
                  </div>
                </Grid>
                <Grid item xs={6} md={3}>
                  <div
                    className={`vital_box ${
                      checkCough(
                        readings
                          .map((item) => item.cough)
                          .reduce((a, b) => a + b)
                      ).control
                        ? "alert-background"
                        : ""
                    }`}
                    onClick={() => setVital("cough")}
                  >
                    <h3>COUGH FREQUENCY:</h3>
                    <span>{`${readings
                      .map((item) => item.cough)
                      .reduce((a, b) => a + b)} coughs / min`}</span>
                    <h3>
                      {
                        checkCough(
                          readings
                            .map((item) => item.cough)
                            .reduce((a, b) => a + b)
                        ).label
                      }
                    </h3>
                  </div>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <div className="graph">
                {readings.length !== 0 && (
                  <LineChart chartData={formatData()} />
                )}
                {readings.length === 0 && <span>No readings recorded</span>}
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Nodedetails;
