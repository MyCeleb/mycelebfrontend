import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyRates from "./MyRates";

function MyProfile({ loggedInUserId, profile, setProfile }) {
  const [rates, setRates] = useState([]);
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
        console.log(data);
        if (data.rates) {
          setRates(data.rates);
        }
      });
  }, [loggedInUserId, rates.length]);

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
      <MyRates rates={rates} />
    </div>
  );
}

export default MyProfile;
