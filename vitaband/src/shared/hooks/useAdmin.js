import { useContext, useEffect, useState } from "react";
import API from "../../utils/API";
import { LoadingContext } from "../contexts/LoadingContext";
import { SnackbarContext } from "../contexts/SnackbarContext";

export const useAdmin = () => {
  const { snackbarDispatch } = useContext(SnackbarContext);
  const { loadingDispatch } = useContext(LoadingContext);
  const [users, setUsers] = useState(null);
  const [nodes, setNodes] = useState(null);
  const [gateways, setGateways] = useState(null);
  const [totalNodes, setTotalNodes] = useState(0);
  const [totalGateways, setTotalGateways] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [nodeQuery, setNodeQuery] = useState("");
  const [gatewayQuery, setGatewayQuery] = useState("");
  const [userQuery, setUserQuery] = useState("");
  const [nodePage, setNodePage] = useState(1);
  const [gatewayPage, setGatewayPage] = useState(1);
  const [userPage, setUserPage] = useState(1);
  const [openNode, setOpenNode] = useState(false);
  const [openGateway, setOpenGateway] = useState(false);
  const [targetNode, setTargetNode] = useState();
  const [targetGateway, setTargetGateway] = useState();
  const [targetUser, setTargetUser] = useState();

  useEffect(() => {
    API.getUsers(
      setUsers,
      setTotalUsers,
      userPage,
      loadingDispatch,
      snackbarDispatch,
      userQuery
    );
  }, [userPage, userQuery]);

  useEffect(() => {
    API.getNodes(
      setNodes,
      setTotalNodes,
      nodePage,
      loadingDispatch,
      snackbarDispatch,
      nodeQuery
    );
  }, [nodePage, nodeQuery]);

  useEffect(() => {
    API.getGateways(
      setGateways,
      setTotalGateways,
      gatewayPage,
      loadingDispatch,
      snackbarDispatch,
      gatewayQuery
    );
  }, [gatewayPage, gatewayQuery]);

  const userToggleHandler = (user) => {
    let isVerified = !user.isVerified;
    let newUsers = [...users];
    let target = newUsers.find((item) => item._id === user._id);
    target.isVerified = isVerified;
    API.editUser(
      { ...user, isVerified },
      loadingDispatch,
      snackbarDispatch,
      () => setUsers(newUsers)
    );
  };

  const editNodeHandler = async (node) => {
    const response = await API.editNode(
      node,
      loadingDispatch,
      snackbarDispatch,
      () => handleNodeClose()
    );
    if (response.status === 200) {
      let newNodes = [...nodes];
      let target = newNodes.find((item) => item._id === node._id);
      target.nodeSerial = node.nodeSerial;
      setNodes(newNodes)
    }
  };

  const editGatewayHandler = async (gateway) => {
    const response = await API.editGateway(
      gateway,
      loadingDispatch,
      snackbarDispatch,
      () => handleGatewayClose()
    );
    if (response.status === 200) {
      let newGateways = [...gateways];
      let target = newGateways.find((item) => item._id === gateway._id);
      target.gatewaySerial = response.data.data.gatewaySerial;
      target.password = response.data.data.password;
      target.ssid = response.data.data.ssid;
      target.endpoint = response.data.data.endpoint;
      setGateways(newGateways)
    }
  };

  const userDeleteHandler = async (userId) => {
    API.deleteUser(users, setUsers, userId, loadingDispatch, snackbarDispatch);};

  const addNodeHandler = async (node) => {
    const response = await API.addNode(
      node,
      loadingDispatch,
      snackbarDispatch,
      () => handleNodeClose()
    );
    if (response.status === 200) {
      setNodes([response.data.data, ...nodes]);
    }
  };

  const deleteNodeHandler = (nodeId) => {
    API.deleteNode(nodes, setNodes, nodeId, loadingDispatch, snackbarDispatch);
  };

  const addGatewayHandler = async (gateway) => {
    const response = await API.addGateway(
      gateway,
      loadingDispatch,
      snackbarDispatch,
      () => handleGatewayClose()
    );
    if (response.status === 200) {
      setGateways([response.data.data, ...gateways]);
    }
  };

  const deleteGatewayHandler = async (gatewayId) => {
    API.deleteGateway(
      gateways,
      setGateways,
      gatewayId,
      loadingDispatch,
      snackbarDispatch
    );
  };

  const gatewayToggleHandler = (gateway) => {
    console.log(gateway.endpoint);
    let endpoint =
      gateway.endpoint === "https://vitaband.herokuapp.com/test/postRead"
        ? "https://vitaband.herokuapp.com/readings"
        : "https://vitaband.herokuapp.com/test/postRead";
    let newGateways = [...gateways];
    let target = newGateways.find((item) => item._id === gateway._id);
    target.endpoint = endpoint;
    API.editGateway(
      { ...gateway, endpoint },
      loadingDispatch,
      snackbarDispatch,
      () => setGateways(newGateways)
    );
  };

  const handleNodeOpen = () => {
    setOpenNode(true);
  };

  const handleNodeClose = () => {
    setOpenNode(false);
  };

  const handleGatewayOpen = () => {
    setOpenGateway(true);
  };

  const handleGatewayClose = () => {
    setOpenGateway(false);
  };

  return {
    users,
    nodes,
    gateways,
    userDeleteHandler,
    userToggleHandler,
    deleteNodeHandler,
    addNodeHandler,
    addGatewayHandler,
    deleteGatewayHandler,
    gatewayToggleHandler,
    openNode,
    openGateway,
    handleNodeOpen,
    handleNodeClose,
    handleGatewayOpen,
    handleGatewayClose,
    targetNode,
    targetGateway,
    targetUser,
    setTargetNode,
    setTargetGateway,
    setTargetUser,
    editNodeHandler,
    editGatewayHandler,
  };
};
