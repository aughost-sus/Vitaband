import React from 'react'
import Navbar from '../Navbar/navbar'
import "../linkanode/linknode.css"
import {MdKeyboardArrowLeft } from 'react-icons/md'
import {GrMapLocation} from 'react-icons/gr'


const Linknode= () => {
    return (
        <div className='linkanode'>
            <Navbar />
           { /* start coding here */ }
           <MdKeyboardArrowLeft className='icon2'/><p>Back to Home</p>
            <div className='link'>
                <span className="heading">Link a Node</span>
                <hr className="line" /><br/>
                <div className="main">
                    <div className="left">
                        <div className='nodeid'>
                            Node ID:
                            <input type="number" placeholder='' className='nodeidinput'/>
                        </div>
                        <div className="box1">
                            <div>
                                NODE
                            </div>
                            <span className='nodenum'>
                                03
                            </span>
                        </div>
                    </div>
                    <div className="right">
                        <div className="patinf">Patient Information</div>
                    <form className='datainput'>
                        <div className="nameinput">
                            Name: <br/>
                                    <input type="name" className='surname' placeholder=' Surname'/>
                                    <input type="name" className='firstname' placeholder=' First Name'/>
                                    <input type="name" className='middle' placeholder=' Middle Name'/>
                        </div>
                        <div className="ageandsex">
                                Age: <input type="Age" className='age'/>
                                Sex:    <input type="radio" className='malebtn'/>  Male
                                        <input type="radio" className='femalebtn'/>  Female
                        </div>
                        <div className="address">
                            Complete Address: <br/>
                                <input type="name" className='street' placeholder=' House #, Street'/>
                                <input type="name" className='brgy' placeholder=' Baranggay'/>
                                <input type="name" className='municipality' placeholder=' City Municipality'/>
                                <input type="name" className='province' placeholder=' Province'/>
                        </div>
                        <div className="gpslocation">
                            GPS Location: <br/>
                            <GrMapLocation size={"30px"} className='locateicon'/>
                            <br/>
                            <div className="locate">Locate</div>
                        </div>
                            <input type="submit" className='linkbtn' placeholder=' hi'/>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
 }

export default Linknode;
