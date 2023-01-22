import React from "react";
import { Link } from "react-router-dom";

function CelebrityNavBar({ name, profile_state }) {
  console.log(profile_state);
  return (
    <div>
      <Link to="/">Home</Link>
      {!profile_state && <Link to="/addprofile">Add Profile</Link>}
    </div>
  );
}

export default CelebrityNavBar;
