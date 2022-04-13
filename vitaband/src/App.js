import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/login";
import Homepage from "./pages/homepage/homepage";
import Linknode from "./pages/linkanode/linknode";
import Nodedetails from "./pages/node-details/nodedetails";
import { useAuth } from "./shared/hooks/useAuth";
import AuthContextProvider from "./shared/contexts/AuthContext";

function App() {
  const { token, login, logout, userId, firstname, lastname } = useAuth();

  console.log(token)
  return (
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
          <Route exact path="/" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/linknode" element={<Linknode />} />
          <Route path="/nodedetails" element={<Nodedetails />} />
        </Routes>
      )}
      {!token && (
        <Routes>
          <Route exact path="/" element={<Login />} />
        </Routes>
      )}
    </AuthContextProvider>
  );
}

export default App;
