import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import Navbar from "../Navbar/navbar";
import "./homepage.css";

const Homepage = () => {
  const [nodes, setNodes] = useState([]);
  const [totalNodes, setTotalNodes] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => API.getNodes(setNodes, setTotalNodes, page), [page]);

  return (
    <div className="hahaha">
      <Navbar />
      <div className="here">
        <div className="homepage">
          <div className="nodelist">
            <div className="nodegrid">
              <div className="Row1">
                {nodes.length !== 0 &&
                  nodes.map((node) => (
                    <div className="Box1">
                      <div className="left">
                        <span>NODE</span>
                        <h2 className="node_id">{node.nodeSerial}</h2>
                      </div>
                      <div className="right">
                        <div className="name">
                          <span>{`${node.patient.firstname} ${node.patient.lastname}`}</span>
                          <br />
                          {node.patient.address} <br />
                          {node.patient.isMale ? "Male" : "Female"} <br />
                          {node.patient.age} years old <br />
                        </div>
                        <div className="dateadded">{`Added on ${new Date(node.createdAt).toLocaleString()}`}</div>
                      </div>
                    </div>
                  ))}
                {/* <div className="Box1">
                  <div className="left">
                    <span>NODE</span>
                    <h2 className="node_id">01</h2>
                  </div>
                  <div className="right">
                    <div className="name">
                      <span>Castro, Ivy Marisse </span>
                      <br />
                      Calumpit, Bulacan <br />
                      Female <br />
                      25 years old <br />
                    </div>
                    <div className="dateadded">Added on blablabal</div>
                  </div>
                </div>
                <div className="Box1">
                  <div className="left">
                    <span>NODE</span>
                    <h2 className="node_id">01</h2>
                  </div>
                  <div className="right">
                    <div className="name">
                      <span>Castro, Ivy Marisse </span>
                      <br />
                      Calumpit, Bulacan <br />
                      Female <br />
                      25 years old <br />
                    </div>
                    <div className="dateadded">Added on blablabal</div>
                  </div>
                </div>
                <div className="Box1">
                  <div className="left">
                    <span>NODE</span>
                    <h2 className="node_id">01</h2>
                  </div>
                  <div className="right">
                    <div className="name">
                      <span>Castro, Ivy Marisse </span>
                      <br />
                      Calumpit, Bulacan <br />
                      Female <br />
                      25 years old <br />
                    </div>
                    <div className="dateadded">Added on blablabal</div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
