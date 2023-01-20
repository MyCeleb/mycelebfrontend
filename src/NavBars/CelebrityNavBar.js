import React from "react";
import { Link } from "react-router-dom";

function CelebrityNavBar({ name, profile }) {
  return (
    <div>
      {profile ? (
        <Link to="/myprofile">My Profile</Link>
      ) : (
        <Link to="/addprofile">Add Profile</Link>
      )}
    </div>
  );
}

export default CelebrityNavBar;
