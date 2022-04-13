import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/contexts/AuthContext";
import API from "../../utils/API";
import "./login.css";

const Login = () => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginHandler = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const response = await API.login(email, password, auth.login, (message) => {
      console.log("Error Logging in");
    });
  };

  return (
    <div className="login">
      <div className="leftpart">
        <span>WELCOME TO THE</span>
        <h1>
          <b>VITABAND</b>
        </h1>
        <h2>
          <b>
            <i>DASHBOARD</i>
          </b>
        </h2>
      </div>
      <div className="rightpart">
        <div className="right_box">
        <form className="loginform" onSubmit={loginHandler}>
          <input
            type="text"
            className="username"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            className="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" className="login" value="LOGIN" />
        </form>
        </div>
        <div className="createaccount">
          <Link to="/nodedetails">
            <button>Node Details</button>
          </Link>
          <Link to="/homepage">
            <button>Homepage</button>
          </Link>
          <Link to="/linknode">
            <button>LinkNode</button>
          </Link>
        </div>
      
      </div>
    </div>
  );
};

export default Login;
