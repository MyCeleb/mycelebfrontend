import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AddRates() {
  const params = useParams();

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleRateAdd = (e) => {
    e.preventDefault();
    fetch("/api/v1/rates", {
      method: "POST",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: description,
        price: price,
        profile_id: Number(params.id),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      });
  };

  return (
    <div>
      AddRates
      <label>Description</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Price</label>
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="button" onClick={handleRateAdd}>
        Add Rate
      </button>
    </div>
  );
}

export default AddRates;
