import {Routes, Route, Link} from "react-router-dom";
import Home from "./Home"
import Create from "./Create";
import Update from "./Update";

function App() {
  return (
    <div className="container"> 
      <nav className="navbar bg-dark ">       
        <ul className="navbar-nav">
          <li className="nav-item mx-4">
            <Link to="/" className="nav-link active text-white">Home</Link>
          </li>              
        </ul>        
      </nav>
      <Link to="/create" className="btn btn-info mt-4">Create Customer</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:customer_ids" element={<Update />} />
      </Routes>

    </div>
  );
}

export default App;
