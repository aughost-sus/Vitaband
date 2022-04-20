import { createTheme, ThemeProvider } from "@mui/material";
import { blue, indigo } from "@mui/material/colors";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login/login";
import Homepage from "./pages/homepage/homepage";
import Linknode from "./pages/linkanode/linknode";
import Nodedetails from "./pages/node-details/nodedetails";
import { useAuth } from "./shared/hooks/useAuth";
import AuthContextProvider from "./shared/contexts/AuthContext";
import LoadingContextProvider from "./shared/contexts/LoadingContext";
import SnackbarContextProvider from "./shared/contexts/SnackbarContext";
import { AnimatePresence } from "framer-motion";
import NodeEditor from "./pages/nodeEditor/nodeEditor";
import FeedBackElementWrapper from "./components/FeedBackElementWrapper";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: indigo,
  },
});

function App() {
  const { token, login, logout, userId, firstname, lastname } = useAuth();
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <LoadingContextProvider>
        <SnackbarContextProvider>
          <AuthContextProvider
            value={{
              isLoggedIn: !!token,
              token,
              userId,
              firstname,
              lastname,
              login,
              logout,
            }}
          >
            <FeedBackElementWrapper>
              {token && (
                <AnimatePresence>
                  <Routes location={location} key={location.pathname}>
                    <Route exact path="/" element={<Homepage />} />
                    <Route path="/homepage" element={<Homepage />} />
                    <Route path="/addnode" element={<NodeEditor />} />
                    <Route path="/linknode" element={<NodeEditor />} />
                    <Route
                      path="/nodedetails/:nodeId"
                      element={<Nodedetails />}
                    />
                  </Routes>
                </AnimatePresence>
              )}
              {!token && (
                <Routes>
                  <Route exact path="/" element={<Login />} />
                  <Route exact path="/login" element={<Login />} />
                </Routes>
              )}
            </FeedBackElementWrapper>
          </AuthContextProvider>
        </SnackbarContextProvider>
      </LoadingContextProvider>
    </ThemeProvider>
  );
}

export default App;
