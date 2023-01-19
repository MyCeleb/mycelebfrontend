import React, { useState, useEffect } from "react";
import SignUp from "./SignUp/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import HomeCelebrity from "./Celebrity/HomeCelebrity";
import CelebrityNavBar from "./NavBars/CelebrityNavBar";
import AddProfile from "./Celebrity/AddProfile";
import MyProfile from "./Celebrity/MyProfile";
function App() {
  const [storedToken, setStoredToken] = useState(localStorage.getItem("token"));
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    if (storedToken) {
      fetch("/api/v1/profile ", {
        method: "GET",
        headers: {
          Accepts: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProfile(data.user.profile);
          setRole(data.user.role);
          setName(data.user.username);
        });
    }
  }, [storedToken]);

  return (
    <div>
      {storedToken && role === "celebrity" && (
        <Router>
          <CelebrityNavBar name={name} profile={profile} />

          <Routes>
            <Route
              path="/"
              element={<HomeCelebrity setStoredToken={setStoredToken} />}
            />
            <Route path="/addprofile" element={<AddProfile />} />
            <Route path="/myprofile" element={<MyProfile />} />
          </Routes>
        </Router>
      )}
      {!storedToken && (
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Login setStoredToken={setStoredToken} />}
            />
            <Route
              path="/signup"
              element={<SignUp setStoredToken={setStoredToken} />}
            />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
