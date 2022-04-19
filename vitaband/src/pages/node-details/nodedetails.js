import React, { useEffect } from "react";
import Navbar from "../Navbar/navbar";
import "../node-details/nodedetails.css";
import LineChart from "../../components/linechart";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { UserData } from "../../components/Data";
import { useState } from "react";
import API from "../../utils/API";
import { useSocket } from "../../shared/hooks/useSocket";
import { Link } from "react-router-dom";

const Nodedetails = ({ nodeId = "623a8a2d96e50a184bd22cc0" }) => {
  const [nodeDetails, setNodeDetails] = useState(null);
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => API.getNode(nodeId, setNodeDetails), []);

  const socketHandler = (data) => {
    //TODO: To be implemented later
    // setNodeDetails();
  };

  useSocket("node", socketHandler);

  return (
    <div className="hahaha">
      <Navbar />
      {/* start coding here */}
      <MdKeyboardArrowLeft className="icon" />
      <Link to="/homepage" style={{ textDecoration: 'none' }}><p>Back to Home</p></Link>
      <div className="nodedetails">
        <div className="status">
          <div className="box">
            <div className="leftside_status">
              <p>STATUS</p>
              <div className="indicator" />
              <span>ACTIVE NODE</span>
            </div>
            <div className="nodename">
              <p>NODE</p>
              <span>03</span>
            </div>
          </div>
        </div>
        <div className="status">
          <div className="patient">
            <div className="pat_info">
              <p>Linked Patient Information:</p>
              <h1>Dela Cruz, Juan</h1>
              <span>Complete Address:</span>
              <p id="address">#510 Kalsadang Bago Caingin San Rafael</p>
              <p id="address">
                Sex:<span id="address"> Male</span>
              </p>
              <p id="address1">
                Age:<span id="address1">23 Yearsz cdold</span>
              </p>
            </div>
          </div>
        </div>
        <div className="status">
          <div className="vitals">
            <p>HEALTH VITALS:</p>
            <div className="display">
              <div className="vital_box">
                <h3>TEMPERATURE:</h3>
                <span>hahaha</span>
              </div>
              <div className="vital_box">
                <h3>OXYGEN LEVEL:</h3>
                <span>hahaha</span>
              </div>
              <div className="vital_box">
                <h3>PULSE RATE:</h3>
                <span>hahaha</span>
              </div>
              <div className="vital_box">
                <h3>COUGH FREQUENCY:</h3>
                <span>hahaha</span>
              </div>
            </div>
          </div>
        </div>
        <div className="status">
          <div className="graph">
            <LineChart chartData={userData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nodedetails;
