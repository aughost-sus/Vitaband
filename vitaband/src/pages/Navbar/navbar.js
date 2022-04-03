import React from 'react'
import Logo from "../../images/Logo_whole.png"
import './navbar.css'
import { Link } from 'react-router-dom'


const Navbar= () => {
    return (
    <div className="navbar">
        <div className='logo'>
        <img src={Logo} 
         className='logo' />
         </div>
         <div className="profile">
             <div className="picture"></div>
             <div className="userdetails">
             <div className="username">Taylor Swift</div>
             <Link to="/"><button className="logout">Logout</button></Link></div>
         </div>
    </div>
    )
 }

export default Navbar;
