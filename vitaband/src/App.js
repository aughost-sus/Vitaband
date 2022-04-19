import { createTheme, ThemeProvider } from "@mui/material";
import { blue, indigo } from "@mui/material/colors";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/login";
import Homepage from "./pages/homepage/homepage";
import Linknode from "./pages/linkanode/linknode";
import Nodedetails from "./pages/node-details/nodedetails";
import { useAuth } from "./shared/hooks/useAuth";
import AuthContextProvider from "./shared/contexts/AuthContext";
import LoadingContextProvider from "./shared/contexts/LoadingContext";
import SnackbarContextProvider from "./shared/contexts/SnackbarContext";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: indigo,
  },
});

function App() {
  const { token, login, logout, userId, firstname, lastname } = useAuth();

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
            {token && (
              <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/linknode" element={<Linknode />} />
                <Route path="/nodedetails/:nodeId" element={<Nodedetails />} />
              </Routes>
            )}
            {!token && (
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/login" element={<Login />} />
              </Routes>
            )}
          </AuthContextProvider>
        </SnackbarContextProvider>
      </LoadingContextProvider>
    </ThemeProvider>
  );
}

export default App;
