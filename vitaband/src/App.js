
import './App.css';

function App() {
  return (
    <div className="login">
      <div className="leftpart">
        <p>WELCOME TO</p>
        <h1><b>VITABAND</b></h1>
        <h2><b><i>DASHBOARD</i></b></h2>
      </div>
      <div className="rightpart">
        <form className="loginform">
          <input 
            type="text" 
            name="Username" 
            value="Username"
            className="username"
            / >
          <input 
            type="text" 
            name="Username" 
            value="Password"
            className="password"
            / >
          <input 
            type="submit"
            className="login"
            value="LOGIN"
            />
        </form>
            </div>
      
    </div>
  );
}

export default App;
