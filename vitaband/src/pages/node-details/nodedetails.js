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
            <div className='nodedetails'> 
            <div className="status">
                <p>STATUS</p>
                <div className="indicator" />
                <span>ACTIVE NODE</span>
                <div className="nodename">
                    <p>NODE</p>
                    <span>03</span>
                </div>
            </div>

             </div>

           
        </div>
    );
 }

export default Nodedetails;
