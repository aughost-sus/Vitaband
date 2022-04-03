
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./pages/Login/login";
import Homepage from './pages/homepage/homepage';
import Linknode from './pages/linkanode/linknode';
import Nodedetails from './pages/node-details/nodedetails';

function App() {
  return (
    <Routes>

   <Route exact path="/" element={<Login />} />
   <Route path="/homepage" element={<Homepage />} />
   <Route path="/linknode" element={<Linknode />} />
   <Route path="/nodedetails" element={<Nodedetails />} />
   
   </Routes>
      
    
  );
}

export default App;
