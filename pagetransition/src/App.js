import React from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './Components/Navbar.jsx'
import AnimatedRoutes from "./Components/AnimatedRoutes.js";

function App() {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;

// install framer-motion react-router-dom

// create new component for routes with location={location} key={location.pathname}
// wrap it with <AnimatePresence>

// on each page bring motion
// add <motion.div></motion.div> as top level div with  initial={{<css here>}} animate={} exit={} properties