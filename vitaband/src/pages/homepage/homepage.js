import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import Navbar from "../Navbar/navbar";
import "./homepage.css";
import { Link, Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [nodes, setNodes] = useState([]);
  const [totalNodes, setTotalNodes] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate ();
  const navigateTo = () => navigate('/nodedetails');

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
                    <div className="Box1" onClick={navigateTo}>
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
                        <div className="dateadded"><span>{`Added on ${new Date(node.createdAt).toLocaleString()}`}</span></div>
                      </div>
        
                    </div>
                  
                  ))}
                  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
