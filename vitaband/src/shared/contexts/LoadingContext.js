import React, { createContext, useReducer } from "react";

export const LoadingContext = createContext();

const LoadingContextProvider = ({ children, value }) => {
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

  const [loadingParams, loadingDispatch] = useReducer(reducer, {
    message: "",
    isOpen: false,
  });

  return (
    <LoadingContext.Provider value={{ loadingParams, loadingDispatch }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContextProvider;
