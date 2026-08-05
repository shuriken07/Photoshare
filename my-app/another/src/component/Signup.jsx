import { useState } from "react";
import "./Login.css";
import { ApiBaseUrl } from "./config.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState([]);
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  const handleRolesChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setRoles([...roles, value]);
    } else {
      setRoles(roles.filter((item) => item !== value));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${ApiBaseUrl}adduser/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          phone,
          email,
          gender,
          roles,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.status) {
        toast.success(
          "Registration successful! A verification email has been sent to your email address. Please verify your email before logging in."
        );
        setUsername("");
        setPassword("");
        setPhone("");
        setEmail("");
        setGender("");
        setRoles([]);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="container">
      <div className="card c2">
        <h2 className="form-label">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}

          />
          <input
            className="form-control"
            type="tel"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            className="form-control"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="form-box" style={{ textAlign: "left" }}>
            <strong>Gender</strong>
            <br />
            <br />
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              Male
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={gender === "Other"}
                onChange={(e) => setGender(e.target.value)}
              />
              Other
            </label>
          </div>
          <div className="form-box" style={{ textAlign: "left" }}>
            <strong>Roles</strong>
            <br />
            <br />
            <label>
              <input
                type="checkbox"
                value="React"
                checked={roles.includes("React")}
                onChange={handleRolesChange}
              />
              React
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="Node"
                checked={roles.includes("Node")}
                onChange={handleRolesChange}
              />
              Node
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="HTML"
                checked={roles.includes("HTML")}
                onChange={handleRolesChange}
              />
              HTML
            </label>
          </div>
          <input
            className="form-control"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />
          <button className="btn btn-warning w-100" type="submit">
            Signup
          </button>
        </form>
        <br />
        <p style={{textAlign: "center",color: "#0d6efd",cursor: "pointer",fontWeight: "bold", }} onClick={() => navigate("/")}>
          Already have an account?
        </p>
      </div>
    </div>
  );
}

export default Signup;