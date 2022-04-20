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
  LinkRounded,
} from "@mui/icons-material";
import { DateTime } from "luxon";

const Nodedetails = () => {
  const { snackbarDispatch } = useContext(SnackbarContext);
  const { loadingDispatch } = useContext(LoadingContext);
  const navigate = useNavigate();
  const [node, setNode] = useState(null);
  const [vital, setVital] = useState("temperature");
  const [readings, setReadings] = useState([]);
  const { nodeId } = useParams();
  const {state} = useLocation();

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

  useEffect(() => {
    API.getNode(
      nodeId,
      setNode,
      setReadings,
      loadingDispatch,
      snackbarDispatch
    );
  }, []);

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
              <Button
                onClick={unlinkHandler}
                startIcon={<DeleteForeverRounded />}
              >
                Remove Patient
              </Button>
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
                  <div className="indicator" style={{ background: "red" }} />
                  <span>ACTIVE</span>
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
              {node && node.patient && (
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "cornflowerblue",
                  }}
                ></div>
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
