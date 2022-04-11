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
                    <div className="left">left
                        <div className="box1">hi</div>
                    </div>
                    <div className="right">
                        <div className="patinf">Patient Information</div>
                        <div className="nameinput">
                            <form action="">
                                Name: <br/>
                                <input type="name" className='surname' placeholder=' Surname'/>
                                <input type="name" className='firstname' placeholder=' First Name'/>
                                <input type="name" className='middle' placeholder=' Middle Name'/>
                            </form>
                        </div>
                        <div className="ageandsex">
                            <form action="">
                                Age: <input type="Age" className='age'/>
                                Sex:    <input type="radio" className='malebtn'/>  Male
                                        <input type="radio" className='femalebtn'/>  Female
                            </form>
                        </div>
                        <div className="address">
                            <form action="">
                            Complete Address: <br/>
                                <input type="name" className='street' placeholder=' House #, Street'/>
                                <input type="name" className='brgy' placeholder=' Baranggay'/>
                                <input type="name" className='municipality' placeholder=' City Municipality'/>
                                <input type="name" className='province' placeholder=' Province'/>
                            </form>
                        </div>
                        <div className="gpslocation">
                            GPS Location: <br/>
                            <GrMapLocation size={"30px"} className='locateicon'/>
                            <br/>
                            <div className="locate">Locate</div>
                        </div>
                        <button className='linkbtn'>Link</button>
                    </div>
                </div>
            </div>
        </div>
    );
 }

export default Linknode;
