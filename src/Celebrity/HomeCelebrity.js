import React from "react";
import { useNavigate } from "react-router-dom";
import MyProfile from "./MyProfile";

function HomeCelebrity({ setStoredToken , profile_state , loggedInUserId, profile, setProfile}) {
  const navigate = useNavigate();

  return (
    <div>
      HomeCelebrity
      <button
        onClick={() => {
          navigate("/");
          setTimeout(() => {
            localStorage.setItem("token", "");
            setStoredToken("");
          }, 1000);
        }}
      >
        Log Out

      </button>

      {profile_state && <MyProfile loggedInUserId={loggedInUserId} profile={profile} setProfile={setProfile} />}
    </div>
  );
}

export default HomeCelebrity;
