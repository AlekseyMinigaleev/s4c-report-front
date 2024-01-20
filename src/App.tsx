import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Welcome from "./pages/welcomePage/Welcome";
import Auth from "./pages/authPages/Auth";
import User from "./pages/userPage/User";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import useAuthentification from "./hooks/useAuthentificationt";

function App() {
  const authContext = useAuthentification();
  return (
    <>
      {authContext.auth?.accessToken == null ? null : <Header />}
      <Router>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/user/" element={<User />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
