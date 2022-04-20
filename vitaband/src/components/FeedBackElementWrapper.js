import { Alert, LinearProgress, Snackbar } from "@mui/material";
import React, { useContext } from "react";
import { LoadingContext } from "../shared/contexts/LoadingContext";
import { SnackbarContext } from "../shared/contexts/SnackbarContext";

const FeedBackElementWrapper = ({ children }) => {
  const { snackbarParams, snackbarDispatch } = useContext(SnackbarContext);
  const { loadingParams } = useContext(LoadingContext);

  return (
    <>
      {loadingParams.isOpen && <LinearProgress />}
      {children}
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
    </>
  );
};

export default FeedBackElementWrapper;
