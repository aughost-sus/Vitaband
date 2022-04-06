import React from 'react'
import Navbar from '../Navbar/navbar'
import "../node-details/nodedetails.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {MdKeyboardArrowLeft } from 'react-icons/md'

const Nodedetails= () => {
    return (
        <div className='hahaha'>
            <Navbar />
            { /* start coding here */ }
            <MdKeyboardArrowLeft className='icon'/><p>Back to Home</p>
            <div className="nodemother">
            <div className='nodedetails'> 
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
                    <p id="address">Sex:<span id="address"> Male</span></p>
                    <p id="address1">Age:<span id="address1">23 Years old</span></p>
                    <div className="pat_info">
                    </div>
                    </div>
            </div>
            </div>
             </div>
             </div>

           
        </div>
    );
 }

export default Nodedetails;
