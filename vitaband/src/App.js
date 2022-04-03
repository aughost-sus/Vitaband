
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./pages/Login/login";

function App() {
  return (
    <Routes>

   <Route exact path="/" element={<Login />} />
   </Routes>
      
    
  );
}

export default App;
