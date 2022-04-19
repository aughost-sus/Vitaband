import React, { useContext } from "react";
import LogoFull from "../../images/Logo_whole.png";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/contexts/AuthContext";
import { Avatar, Box, Stack } from "@mui/material";
import {
  AccountCircleRounded,
  PersonPinCircleRounded,
} from "@mui/icons-material";

const Navbar = () => {
  const auth = useContext(AuthContext);

  return (
    <Stack
      sx={{
        height: "4rem",
        boxShadow: "1px 0px 10px #d1d1d1",
        backgroundColor: "white",
        padding: "0.5rem 1rem",
        boxSizing: "border-box",
      }}
      direction="row"
    >
      <Box className="logo" sx={{ display: { xs: "none", sm: "block" } }}>
        <img src={LogoFull} alt="Vitaband_Logo" />
      </Box>
      <Box className="logo" sx={{ display: { xs: "block", sm: "none" } }}>
        <img src="./logo.png" alt="Vitaband_Logo" />
      </Box>
      <div className="userdetails">
        <div className="username">{`${auth.firstname} ${auth.lastname}`}</div>
        <Link to="/">
          <button className="logout" onClick={auth.logout}>
            Logout
          </button>
        </Link>
      </div>
      <Avatar sx={{alignSelf: 'center', bgcolor: 'secondary.main'}}>
        <AccountCircleRounded />
      </Avatar>
    </Stack>
  );
};

export default Navbar;
