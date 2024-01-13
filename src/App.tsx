import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Welcome from "./pages/Welcome";
import Auth from "./pages/authPages/Auth";
import Footer from "./components/common/Footer";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/auth/*" element={<Auth/>} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
