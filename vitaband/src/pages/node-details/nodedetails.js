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
import { Box, Button, Container, Grid, Stack } from "@mui/material";
import {
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

  const isWear = () => {
    if (readings.length !== 0) {
      if (readings.at(-1).ir > 30000) {
        return true;
      }
    }
    return false;
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
      newReadings.shift();
      newReadings.push(data.reading);
      return newReadings;
    });
  };

  const unlinkHandler = async () => {
    await API.editNode(
      {
        nodeSerial: node.nodeSerial,
        patient: null,
        nodeId,
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
        <Container>
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
                  <span>{isWear() ? "" : " - NOT WORN"}</span>
                </div>
                <div className="nodename">
                  <p>NODE</p>
                  <span>03</span>
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
                  sx={{ paddingLeft: { xs: "0rem", sm: "4rem" } }}
                  className="patient-details"
                >
                  <h1>No Patient Associated</h1>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {node && node.patient && readings.length !== 0 && (
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
                  onMapClick={(ev) => {}}
                />
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
                    className="vital_box"
                    onClick={() => setVital("temperature")}
                  >
                    <h3>TEMPERATURE:</h3>
                    <span>{readings.at(-1).temperature} </span>
                  </div>
                </Grid>
                <Grid item xs={6} md={3}>
                  <div className="vital_box" onClick={() => setVital("spo2")}>
                    <h3>OXYGEN LEVEL:</h3>
                    <span>{readings.at(-1).spo2}</span>
                  </div>
                </Grid>
                <Grid item xs={6} md={3}>
                  <div
                    className="vital_box"
                    onClick={() => setVital("heartRate")}
                  >
                    <h3>PULSE RATE:</h3>
                    <span>{readings.at(-1).heartRate}</span>
                  </div>
                </Grid>
                <Grid item xs={6} md={3}>
                  <div className="vital_box" onClick={() => setVital("cough")}>
                    <h3>COUGH FREQUENCY:</h3>
                    <span>{readings.at(-1).cough ? 1 : 0}</span>
                  </div>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <div className="graph">
                {readings.length !== 0 && (
                  <LineChart chartData={formatData()} />
                )}
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Nodedetails;
