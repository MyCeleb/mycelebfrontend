import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MyProfile({ loggedInUserId, profile, setProfile }) {
  useEffect(() => {
    fetch(`/api/v1/my_profile/${loggedInUserId}`, {
      method: "GET",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      });
  }, [loggedInUserId]);

  return (
    <div>
      MyProfile
      <div>
        <h1>{profile.stage_name}</h1>
        <h2>{profile.artist_type}</h2>
        <img src={profile.image} alt="profile" style={{ width: "200px" }} />
        <Link to={`/addrates/${profile.id}`}>
          <button>Add Rates</button>
        </Link>
      </div>
    </div>
  );
}

export default MyProfile;
