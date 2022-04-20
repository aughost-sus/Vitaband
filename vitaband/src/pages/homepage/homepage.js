import React, { useContext, useEffect, useState } from "react";
import API from "../../utils/API";
import Navbar from "../Navbar/navbar";
import "./homepage.css";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  LinearProgress,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AddCircle, LinkRounded } from "@mui/icons-material";
import { GrSearch } from "react-icons/gr";
import { SnackbarContext } from "../../shared/contexts/SnackbarContext";
import { LoadingContext } from "../../shared/contexts/LoadingContext";
import AddNodeModal from "./AddNodeModal";
import {motion} from "framer-motion";
import {Suspense} from 'react';
import Loader from '../../components/loader'

const Homepage = () => {
  const [nodes, setNodes] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [totalNodes, setTotalNodes] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { snackbarParams, snackbarDispatch } = useContext(SnackbarContext);
  const { loadingParams, loadingDispatch } = useContext(LoadingContext);

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

  const handleOpen = (scrap) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const appendNode = (node) => {
    setNodes([node, ...nodes]);
  };

  const searchHandler = (e) => {
    setQuery(e.target.value);
  };

  const addNodeHandler = (node) => {
    API.addNode(
      node,
      loadingDispatch,
      snackbarDispatch,
      handleClose,
      appendNode
    );
  };

  var x = 0;

  if (x<=0) {
    x+=1;
  } else {
    document.getElementById("card-header").className += " card-header-active";
  }


  return (
    <motion.div className="whole"
    initial = {{opacity:0}}
    animate = {{opacity: 1}}
    exit = {{opacity:0}}>
    <Box
    >
      {loadingParams.isOpen && <LinearProgress />}
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
                onClick={handleOpen}
                startIcon={<AddCircle />}
              >
                Add a Node
              </Button>
              <Button
                variant="text"
                onClick={() => navigate('/linknode')}
                startIcon={<LinkRounded />}
              >
                Link a Node
              </Button>
            </Stack>
            <input
              type="text"
              className="form-field"
              onChange={searchHandler}
            />
          </Grid>
          <motion.div
          initial = {{opacity:0,
          x: '100px'
          }}
          animate = {{opacity: 1,
            x: '0px',
            duration: 2
           }}
          exit = {{opacity:0}}>
          <Suspense fallback={<Loader />}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {nodes.length !== 0 &&
                nodes.map((node) => (
                 
                  <Grid item xs={12} sm={6} md={4} lg={3} key={node.nodeSerial}>
                    <div
                      className="node-card"
                      onClick={() => navigate(`/nodedetails/${node._id}`)}
                    >
                      <div className={ node.patient ? 'card-header' : 'card-header-active'}>
                        <div>NODE</div>
                        <h1 className="node_id">{node.nodeSerial}</h1>
                      </div>
                      <div className="card-content">
                        {node.patient && (
                          <>
                            <h3>{`${node.patient.firstname} ${node.patient.lastname}`}</h3>
                            <h5>{node.patient.address}</h5>
                            <h5>{node.patient.isMale ? "Male" : "Female"}</h5>
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
      <AddNodeModal
        open={open}
        handleClose={handleClose}
        handleSubmit={addNodeHandler}
      />
      <Snackbar
        anchorOrigin={{
          vertical: snackbarParams.vertical,
          horizontal: snackbarParams.horizontal,
        }}
        open={snackbarParams.isOpen}
        autoHideDuration={snackbarParams.duration}
        onClose={() => snackbarDispatch({ type: "SET_SHOW", payload: false })}
      >
        <Alert
          onClose={() => snackbarDispatch({ type: "SET_SHOW", payload: false })}
          severity={snackbarParams.severity}
          variant="filled"
        >
          {snackbarParams.message}
        </Alert>
      </Snackbar>
    </Box>
    </motion.div>
  );
};

export default Homepage;
