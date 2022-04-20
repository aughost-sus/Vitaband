import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/contexts/AuthContext";
import API from "../../utils/API";
import "./login.css";
import logo from "../../images/Logo_whole.png";
import { Alert, Box, Grid, LinearProgress, Snackbar } from "@mui/material";
import { LoadingContext } from "../../shared/contexts/LoadingContext";
import { SnackbarContext } from "../../shared/contexts/SnackbarContext";
import {motion} from "framer-motion";

const Login = () => {
  const auth = useContext(AuthContext);
  const { snackbarParams, snackbarDispatch } = useContext(SnackbarContext);
  const { loadingParams, loadingDispatch } = useContext(LoadingContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
    e.preventDefault();
    console.log(email, password);
    await API.login(email, password, auth.login, (message) => {
      snackbarDispatch({
        type: "SET_PARAMS",
        payload: {
          message,
          isOpen: true,
          severity: "error",
        },
      });
    });
    loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
    navigate("/");
  };

  return (
    <motion.div
    initial = {{opacity:0,
      x: '500px'
      }}
      animate = {{opacity: 1,
        x: '0px',
        duration: 5
       }}
      exit = {{opacity:0}}
    >
    <Box
      sx={{
        backgroundImage: "url(./LOGIN.png)",
        height: "100vh",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        width: "100vw",
      }}
    >
      {loadingParams.isOpen && <LinearProgress />}

      <Grid container sx={{ height: { xs: "60%", md: "100%" } }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "4rem",
          }}
        >
          <span>WELCOME TO THE</span>
          <div className="image">
            <img src={logo} />
          </div>
          <h1>
            <b>
              <i>DASHBOARD</i>
            </b>
          </h1>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "4rem",
          }}
        >
          <Box
            component="form"
            onSubmit={loginHandler}
            className="loginform"
            sx={{ padding: { sm: "0rem", md: "6rem" },
          }}
          >
            <input
              type="text"
              className="form-field"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className="form-field"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" className="form-button" value="LOGIN" />
          </Box>
          <div className="createaccount">
            <Link to="/nodedetails">
              <button>Node Details</button>
            </Link>
            <Link to="/homepage">
              <button>Homepage</button>
            </Link>
            <Link to="/linknode">
              <button>LinkNode</button>
            </Link>
          </div>
        </Grid>
      </Grid>
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

export default Login;
