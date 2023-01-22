import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProfile({ loggedInUserId }) {
  const [stage_name, setStageName] = useState("");
  const [artist_type, setArtistType] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const uploadImage = (files) => {
    const formData = new FormData();

    formData.append("file", files[0]);
    formData.append("upload_preset", "e2e6z2lx");
    fetch("https://api.cloudinary.com/v1_1/dakiak4mc/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setImage(data.secure_url);
      });
  };

  const sendProfile = () => {
    fetch("/api/v1/profiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stage_name: stage_name,
        artist_type: artist_type,
        image: image,
        user_id: loggedInUserId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      });
  };

  return (
    <div>
      AddProfile
      <form>
        <label>Image</label>
        <input type="file" onChange={(e) => uploadImage(e.target.files)} />
        <label>Stage Name</label>
        <input
          type="text"
          value={stage_name}
          onChange={(e) => setStageName(e.target.value)}
        />

        <label>Artist Type</label>
        <select
          value={artist_type}
          onChange={(e) => setArtistType(e.target.value)}
        >
          <option value="" disabled selected hidden>
            {" "}
            -- select an option --{" "}
          </option>
          <option value="singer">Singer</option>
          <option value="dancer">Dancer</option>
          <option value="actor">Actor</option>
          <option value="comedian">Comedian</option>
          <option value="model">Model</option>
          <option value="other">Other</option>
        </select>

        <button type="button" onClick={sendProfile}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProfile;
