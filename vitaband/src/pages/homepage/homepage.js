import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import Navbar from "../Navbar/navbar";
import "./homepage.css";

const Homepage = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(async () => {
    const response = await API.getNodes();
    if (response.status === 200) {
      setNodes(response.data.data);
      console.log(response.data.data);
    } else {
    }
  }, []);

  return (
    <div className="hahaha">
      <Navbar />
      {/* start coding here */}
      <div className="here">
        <div className="homepage">
          <div className="nodelist">
            <div className="nodegrid">
              <div className="Row1">
                <div className="Box1">
                  <div className="left">
                    <span>NODE</span>
                    <h2 className="node_id">01</h2>
                  </div>
                  <div className="right">
                    <div className="name">
                      <span>Castro, Ivy Marisse </span><br /> 
                      Calumpit, Bulacan <br />
                      Female <br />
                      25 years old <br />
                  </div>
                  <div className="dateadded">
                    Added on blablabal
                  </div>
                </div>
                </div>
                <div className="Box1">
                  <div className="left">
                    <span>NODE</span>
                    <h2 className="node_id">01</h2>
                  </div>
                  <div className="right">
                    <div className="name">
                      <span>Castro, Ivy Marisse </span><br /> 
                      Calumpit, Bulacan <br />
                      Female <br />
                      25 years old <br />
                  </div>
                  <div className="dateadded">
                    Added on blablabal
                  </div>
                </div>
                </div>
                <div className="Box1">
                  <div className="left">
                    <span>NODE</span>
                    <h2 className="node_id">01</h2>
                  </div>
                  <div className="right">
                    <div className="name">
                      <span>Castro, Ivy Marisse </span><br /> 
                      Calumpit, Bulacan <br />
                      Female <br />
                      25 years old <br />
                  </div>
                  <div className="dateadded">
                    Added on blablabal
                  </div>
                </div>
                </div>
              </div>
             
               
             
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
