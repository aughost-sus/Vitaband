import React, { createContext, useReducer } from "react";

export const SnackbarContext = createContext();

const SnackbarContextProvider = ({ children, value }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_PARAMS":
        return { ...state, ...action.payload };
      case "SET_SHOW":
        return { ...state, isOpen: action.payload };
      default:
        return state;
    }
  };

  const [snackbarParams, snackbarDispatch] = useReducer(reducer, {
    message: "",
    severity: "success",
    isOpen: false,
    duration: 6000,
    vertical: "bottom",
    horizontal: "center",
  });

  return (
    <SnackbarContext.Provider value={{ snackbarParams, snackbarDispatch }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider;
