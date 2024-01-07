import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import WelcomPage from "./pages/WelcomePage";
import Footer from "./components/common/Footer";
import AuthPage from "./pages/authPages/AuthPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/welcome" element={<WelcomPage />} />
          <Route path="/auth/*" element={<AuthPage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
