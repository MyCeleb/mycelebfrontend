import React from "react";
import { useNavigate } from "react-router-dom";

function HomeCelebrity({ setStoredToken }) {
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
    </div>
  );
}

export default HomeCelebrity;
