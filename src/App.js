import React, { useState, useEffect } from "react";
import SignUp from "./SignUp/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import HomeCelebrity from "./Celebrity/HomeCelebrity";
import CelebrityNavBar from "./NavBars/CelebrityNavBar";
import AddProfile from "./Celebrity/AddProfile";
import MyProfile from "./Celebrity/MyProfile";
import AddRates from "./Celebrity/AddRates";
function App() {
  const [storedToken, setStoredToken] = useState(localStorage.getItem("token"));
  const [profile_state, setProfileState] = useState("");
  const [profile, setProfile] = useState({});
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState("");

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
          setProfileState(data.user.profile);
          setRole(data.user.role);
          setName(data.user.username);
          setLoggedInUserId(data.user.id);
          console.log(data);
        });
    }
  }, [profile.length, storedToken]);

  return (
    <div>
      {storedToken && role === "celebrity" && (
        <Router>
          <CelebrityNavBar name={name} profile_state={profile_state} />

          <Routes>
            <Route
              path="/"
              element={
                <HomeCelebrity
                  setStoredToken={setStoredToken}
                  profile_state={profile_state}
                  loggedInUserId={loggedInUserId}
                  profile={profile}
                  setProfile={setProfile}
                />
              }
            />
            <Route
              path="/addprofile"
              element={<AddProfile loggedInUserId={loggedInUserId} />}
            />
            <Route
              path="/myprofile"
              element={<MyProfile loggedInUserId={loggedInUserId} />}
            />
            <Route
              path="/addrates/:id"
              element={<AddRates />}
              loggedInUserId={loggedInUserId}
            />
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
