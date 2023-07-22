import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import Cdev from './components/Cdev';
import Noteitem from './components/Noteitem';
import Notes from './components/Notes';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/cdev" element={<Cdev />} />
            <Route exact path="/noteitem" element={<Noteitem />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/notes" element={<Notes />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
