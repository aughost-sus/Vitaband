
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./pages/Login/login";
import Homepage from './pages/homepage/homepage';

function App() {
  return (
    <Routes>

   <Route exact path="/" element={<Login />} />
   <Route path="/homepage" element={<Homepage />} />
   </Routes>
      
    
  );
}

export default App;
