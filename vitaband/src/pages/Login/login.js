import React from 'react'
import { Link } from 'react-router-dom'
import "./login.css"

const Login = () => {
    return (
        <div className="login">
            <div className="leftpart">
        <span>WELCOME TO THE</span>
        <h1><b>VITABAND</b></h1>
        <h2><b><i>DASHBOARD</i></b></h2>
      </div>
      <div className="rightpart">
        <form className="loginform">
          <input 
            type="text" 
            className="username"
            / >
          <input 
            type="text" 
    
            className="password"
            / >
          <Link to="/homepage"><input 
            type="submit"
            className="login"
            value="LOGIN"
            /></Link>
        </form> 
        <div className="createaccount">
       <p>Create an account</p>
            <Link to="/nodedetails"><button>Node Details</button></Link>
            <Link to="/homepage"><button>Homepage</button></Link>
            <Link to="/linknode"><button>LinkNode</button></Link>
        </div>   
        </div>
        
        </div>
        
    )
}

export default Login
