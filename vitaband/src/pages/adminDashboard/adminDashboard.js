import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Switch,
  LinearProgress,
  IconButton,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import Navbar from "../Navbar/navbar";
import { useAdmin } from "../../shared/hooks/useAdmin";
import { AddCircleRounded, DeleteRounded } from "@mui/icons-material";
import AddNodeModal from "./AddNodeModal";
import AddGatewayModal from "./AddGatewayModal";

const AdminDashboard = () => {
  const {
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
  } = useAdmin();

  return (
    <motion.div
      className="whole"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box>
        <Navbar />
        <Container
          sx={{
            padding: "1rem 0rem",
            height: { xs: "initial", md: "calc(100vh - 4rem)" },
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{ height: { xs: "initial", md: "100%" } }}
          >
            <Grid item xs={12} md={4}>
              <Card sx={{ height: { xs: "initial", md: "100%" } }}>
                <CardHeader
                  title="Account Manager"
                  sx={{ backgroundColor: "primary.main" }}
                />
                <CardContent>
                  {users && (
                    <List>
                      {users.map((user) => (
                        <ListItem
                          key={user._id}
                          secondaryAction={
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={userDeleteHandler}
                            >
                              <DeleteRounded />
                            </IconButton>
                          }
                        >
                          <ListItemText
                            id={user._id}
                            primary={`${user.firstname} ${user.lastname}`}
                            secondary={user.email}
                          />
                          <Switch
                            edge="end"
                            onChange={() => userToggleHandler(user)}
                            checked={user.isVerified}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                  {!users && <LinearProgress />}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: { xs: "initial", md: "100%" } }}>
                <CardHeader
                  title="Node Manager"
                  sx={{ backgroundColor: "primary.main" }}
                  action={
                    <Button
                      onClick={() => {
                        setTargetNode(null);
                        handleNodeOpen();
                      }}
                      variant="outlined"
                      startIcon={<AddCircleRounded />}
                      sx={{
                        color: "white",
                        borderColor: "white",
                        "&:hover": { borderColor: "white" },
                      }}
                    >
                      Add
                    </Button>
                  }
                />
                <CardContent>
                  {nodes && (
                    <List>
                      {nodes.map((node) => (
                        <ListItem
                          onClick={() => {
                            setTargetNode(node);
                            handleNodeOpen();
                          }}
                          key={node._id}
                          secondaryAction={
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => deleteNodeHandler(node._id)}
                            >
                              <DeleteRounded />
                            </IconButton>
                          }
                        >
                          <ListItemText
                            id={node._id}
                            primary={`${node.nodeSerial}`}
                            secondary={
                              node.patient
                                ? `Patient: ${node.patient.firstname} ${node.patient.lastname}`
                                : "No Patient Associated"
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                  {!users && <LinearProgress />}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: { xs: "initial", md: "100%" } }}>
                <CardHeader
                  title="Gateway Manager"
                  sx={{ backgroundColor: "primary.main" }}
                  action={
                    <Button
                      onClick={() => {
                        setTargetGateway(null);
                        handleGatewayOpen();
                      }}
                      variant="outlined"
                      startIcon={<AddCircleRounded />}
                      sx={{
                        color: "white",
                        borderColor: "white",
                        "&:hover": { borderColor: "white" },
                      }}
                    >
                      Add
                    </Button>
                  }
                />
                <CardContent>
                  {gateways && (
                    <List>
                      {gateways.map((gateway) => (
                        <ListItem
                          onClick={() => {
                            setTargetGateway(gateway);
                            handleGatewayOpen();
                          }}
                          key={gateway._id}
                          secondaryAction={
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => deleteGatewayHandler(gateway._id)}
                            >
                              <DeleteRounded />
                            </IconButton>
                          }
                        >
                          <ListItemText
                            id={gateway._id}
                            primary={`${gateway.gatewaySerial}`}
                            secondary={
                              gateway.endpoint ===
                              "https://vitaband.herokuapp.com/test/postRead"
                                ? "Test Mode"
                                : "Persistence Mode"
                            }
                          />
                          <Switch
                            edge="end"
                            onChange={() => gatewayToggleHandler(gateway)}
                            checked={
                              gateway.endpoint !==
                              "https://vitaband.herokuapp.com/test/postRead"
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                  {!gateways && <LinearProgress />}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <AddNodeModal
            open={openNode}
            handleClose={handleNodeClose}
            handleSubmit={addNodeHandler}
            handleEdit={editNodeHandler}
            node={targetNode}
          />
          <AddGatewayModal
            open={openGateway}
            handleClose={handleGatewayClose}
            handleSubmit={addGatewayHandler}
            handleEdit={editGatewayHandler}
            gateway={targetGateway}
          />
        </Container>
      </Box>
    </motion.div>
  );
};

export default AdminDashboard;
