import { responsiveFontSizes } from "@mui/material";
import axios from "axios";
import { API_URL, LS_USER_DATA } from "./constants";

const requestAxios = async (
  endpoint,
  body = {},
  method = "GET",
  type = "application/json"
) => {
  try {
    method = method.toUpperCase();
    let response = false;

    const storedData = JSON.parse(localStorage.getItem(LS_USER_DATA));
    let token = storedData?.token || false;

    let headers = {
      Authorization: token ? `Bearer ${token}` : undefined,
    };
    headers["Content-Type"] = type;

    try {
      response = await axios({
        url: `${API_URL}${endpoint}`,
        method: method,
        data: method === "GET" ? undefined : JSON.stringify(body),
        headers,
      });

      return response;
    } catch (err) {
      console.error(err);
      return err.response;
    }
  } catch (err) {
    console.log(err);
    console.error("HTTP request failed", err);
    return false;
  }
};

const login = async (email, password, callback, errorCallback) => {
  let response = await requestAxios(
    "/auth/user/login",
    { email, password },
    "POST"
  );
  if (response.status === 200) {
    console.log(">>>>>>>>", response);
    callback(
      response.data.data.userId,
      response.data.data.token,
      response.data.data.firstname,
      response.data.data.lastname
    );
  } else {
    errorCallback(response.data.message || "Failed to login");
  }
  return response;
};

const signup = async (firstname, lastname, email, password) => {
  let response = await requestAxios(
    "/auth/user/signup",
    { firstname, lastname, email, password },
    "POST"
  );
  return response;
};

const getNodes = async (
  setNodes,
  setTotalNodes,
  page,
  loadingDispatch,
  snackbarDispatch,
  query
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(
    `/nodes?page=${page}&&query=${query}&&target=nodeSerial`
  );
  if (response.status === 200) {
    setNodes(response.data.data.nodes);
    setTotalNodes(response.data.data.totalItems);
    console.log(response.data.data);
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to load Nodes",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const addNode = async (node, loadingDispatch, snackbarDispatch, backToHome) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(
    "/nodes",
    { nodeSerial: node.nodeSerial, patient: node.patient },
    "POST"
  );
  if (response.status === 200) {
    console.log(response);
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Node Added",
        isOpen: true,
        severity: "success",
      },
    });
    backToHome();
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to add node",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const getNode = async (nodeId, setNodeDetails) => {
  let response = await requestAxios(`/nodes/${nodeId}`);
  if (response.status === 200) {
    setNodeDetails(response.data.data);
    console.log(response.data.data);
  } else {
    console.log("Failed to fetch data");
  }
};

const editNode = async (nodeSerial, patient, nodeId) => {
  let response = await requestAxios(
    `/nodes/${nodeId}`,
    { nodeSerial, patient },
    "PUT"
  );
  return response;
};

const API = {
  login,
  signup,
  getNodes,
  addNode,
  getNode,
  editNode,
};

export default API;
