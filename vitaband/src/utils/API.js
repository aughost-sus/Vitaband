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
      response.data.data.lastname,
      response.data.data.accountType
    );
  } else {
    errorCallback(response.data.message || "Failed to login");
  }
  return response;
};

const signup = async (
  firstname,
  lastname,
  email,
  password,
  callback,
  errorCallback
) => {
  let response = await requestAxios(
    "/auth/user/signup",
    { firstname, lastname, email, password },
    "POST"
  );
  if (response.status === 200) {
    callback();
  }
  if (response.status === 422) {
    errorCallback(response.data.data[0].msg);
  } else {
    errorCallback("Failed to Sign Up");
  }
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
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Node Added",
        isOpen: true,
        severity: "success",
      },
    });
    backToHome();
  } else if (response.status === 422) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: response.data.data[0].msg,
        isOpen: true,
        severity: "error",
      },
    });
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
  return response;
};

const getNode = async (
  nodeId,
  setNode,
  setReadings,
  loadingDispatch,
  snackbarDispatch
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(`/nodes/${nodeId}`);
  if (response.status === 200) {
    setNode(response.data.data.node);
    setReadings(response.data.data.readings);
    console.log(response.data.data);
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Node Added",
        isOpen: true,
        severity: "success",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const editNode = async (
  node,
  loadingDispatch,
  snackbarDispatch,
  backToHome
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(
    `/nodes/${node._id}`,
    { nodeSerial: node.nodeSerial, patient: node.patient },
    "PUT"
  );
  if (response.status === 200) {
    console.log(response);
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Node Edited",
        isOpen: true,
        severity: "success",
      },
    });
    backToHome();
  } else if (response.status === 422) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: response.data.data[0].msg,
        isOpen: true,
        severity: "error",
      },
    });
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to edit node",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
  return response;
};

const deleteNode = async (
  nodes,
  setNodes,
  nodeId,
  loadingDispatch,
  snackbarDispatch
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } }, "DELETE");
  let response = await requestAxios(`/nodes/${nodeId}`, {}, "DELETE");
  console.log(response);
  if (response.status === 200) {
    setNodes(nodes.filter((node) => node._id !== nodeId));
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Node Deleted",
        isOpen: true,
        severity: "success",
      },
    });
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to Delete Node",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const getGateways = async (
  setGateways,
  setTotalGateways,
  page,
  loadingDispatch,
  snackbarDispatch,
  query
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(
    `/gateways?page=${page}&&query=${query}&&target=gatewaySerial`
  );
  if (response.status === 200) {
    setGateways(response.data.gateways);
    setTotalGateways(response.data.totalItems);
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to load Gateways",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const addGateway = async (
  gateway,
  loadingDispatch,
  snackbarDispatch,
  callback
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios("/gateways", gateway, "POST");
  if (response.status === 200) {
    callback();
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Gateway Added",
        isOpen: true,
        severity: "success",
      },
    });
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to add gateway",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
  return response;
};

const editGateway = async (
  gateway,
  loadingDispatch,
  snackbarDispatch,
  backToHome
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(`/gateways/${gateway._id}`, gateway, "PUT");
  if (response.status === 200) {
    console.log(response);
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Gateway Edited",
        isOpen: true,
        severity: "success",
      },
    });
    backToHome();
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to edit node",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
  return response;
};

const deleteGateway = async (
  gateways,
  setGateways,
  gatewayId,
  loadingDispatch,
  snackbarDispatch
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } }, "DELETE");
  let response = await requestAxios(`/gateways/${gatewayId}`, {}, "DELETE");
  if (response.status === 200) {
    setGateways(gateways.filter((gateway) => gateway._id !== gatewayId));
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Gateway Deleted",
        isOpen: true,
        severity: "success",
      },
    });
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to Delete Gateway",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const getUsers = async (
  setUsers,
  setTotalUsers,
  page,
  loadingDispatch,
  snackbarDispatch,
  query
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(
    `/users?page=${page}&&query=${query}&&target=email`
  );
  if (response.status === 200) {
    setUsers(response.data.users);
    setTotalUsers(response.data.totalItems);
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to load Users",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const editUser = async (
  user,
  loadingDispatch,
  snackbarDispatch,
  updateUsers
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(`/users/${user._id}`, user, "PUT");
  if (response.status === 200) {
    updateUsers();
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Account Status Updated",
        isOpen: true,
        severity: "success",
      },
    });
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to update user status",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const deleteUser = async (
  users,
  setUsers,
  userId,
  loadingDispatch,
  snackbarDispatch
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } }, "DELETE");
  let response = await requestAxios(`/users/${userId}`, {}, "DELETE");
  if (response.status === 200) {
    setUsers(users.filter((user) => user._id !== userId));
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "User Deleted",
        isOpen: true,
        severity: "success",
      },
    });
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to Delete User",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const API = {
  login,
  signup,
  getNodes,
  addNode,
  getNode,
  editNode,
  deleteNode,
  getUsers,
  editUser,
  deleteUser,
  getGateways,
  addGateway,
  editGateway,
  deleteGateway,
};

export default API;
