import React, { useContext, useEffect, useState } from "react";
import API from "../../utils/API";
import Navbar from "../Navbar/navbar";
import "./homepage.css";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { AddCircle, LinkRounded } from "@mui/icons-material";
import { SnackbarContext } from "../../shared/contexts/SnackbarContext";
import { LoadingContext } from "../../shared/contexts/LoadingContext";
import { motion } from "framer-motion";
import { Suspense } from "react";
import Loader from "../../components/loader";

const Homepage = () => {
  const [nodes, setNodes] = useState([]);
  const [totalNodes, setTotalNodes] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { snackbarDispatch } = useContext(SnackbarContext);
  const { loadingDispatch } = useContext(LoadingContext);

  useEffect(
    () =>
      API.getNodes(
        setNodes,
        setTotalNodes,
        page,
        loadingDispatch,
        snackbarDispatch,
        query
      ),
    [page, query]
  );

  const searchHandler = (e) => {
    setQuery(e.target.value);
  };


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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack direction="row" sx={{ padding: "1rem" }}>
                <Typography
                  variant="h6"
                  sx={{ flexGrow: 1, marginRight: "1rem" }}
                >
                  Select a Node to See Details
                </Typography>
                <Button
                  variant="text"
                  onClick={() =>
                    navigate("/addnode", { state: { isNew: true } })
                  }
                  startIcon={<AddCircle />}
                >
                  Add a Node
                </Button>
              </Stack>
              <input
                type="text"
                className="form-field"
                onChange={searchHandler}
              />
            </Grid>
            <motion.div
              initial={{ opacity: 0, x: "100px" }}
              animate={{ opacity: 1, x: "0px", duration: 2 }}
              exit={{ opacity: 0 }}
            >
              <Suspense fallback={<Loader />}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {nodes.length !== 0 &&
                      nodes.map((node) => (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          key={node.nodeSerial}
                        >
                          <div
                            className="node-card"
                            onClick={() =>
                              navigate(`/nodedetails/${node._id}`, {
                                state: { nodeSerial: node.nodeSerial },
                              })
                            }
                          >
                            <div
                              className={
                                node.patient
                                  ? "card-header"
                                  : "card-header-active"
                              }
                            >
                              <div>NODE</div>
                              <h1 className="node_id">{node.nodeSerial}</h1>
                            </div>
                            <div className="card-content">
                              {node.patient && (
                                <>
                                  <h3>{`${node.patient.firstname} ${node.patient.lastname}`}</h3>
                                  <h5>{node.patient.address}</h5>
                                  <h5>
                                    {node.patient.isMale ? "Male" : "Female"}
                                  </h5>
                                  <h5>{node.patient.age} years old</h5>
                                  <div className="dateadded">
                                    {`Added on ${new Date(
                                      node.createdAt
                                    ).toLocaleString()}`}
                                  </div>
                                </>
                              )}
                              {!node.patient && (
                                <>
                                  <h3 style={{ color: "grey" }}>
                                    No Patient Associated
                                  </h3>
                                  <div className="dateadded">
                                    {`Added on ${new Date(
                                      node.createdAt
                                    ).toLocaleString()}`}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </Grid>
                      ))}
                  </Grid>
                </Grid>
              </Suspense>
            </motion.div>
          </Grid>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Homepage;
