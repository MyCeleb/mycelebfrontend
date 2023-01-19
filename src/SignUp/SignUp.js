import { useState } from "react";
import { Link } from "react-router-dom";
function SignUp({ setStoredToken }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [phone_number, setPhoneNumber] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/v1/users", {
      method: "POST",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
          role,
          phone_number,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.jwt);

        setStoredToken(data.jwt);
      });

    setUsername("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="App">
      <h1>Create new user</h1>
      <form>
        <label>
          Username:
          <input
            type="text"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Role:
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="celebrity">Celebrity</option>
          </select>
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="name"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </form>
      <p>Already have an account?</p>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default SignUp;
