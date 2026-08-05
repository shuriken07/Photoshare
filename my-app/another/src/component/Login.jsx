import { useState } from "react";
import "./Login.css";
import { ApiBaseUrl } from "./config.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${ApiBaseUrl}login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: name,
            password: password,
          }),
        }
      );
      const data = await response.json();
      console.log(data.message);
      if (data.status) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id || data.user._id);
        localStorage.setItem("username", data.user.username);

        toast.success("Login Successful");
        setName("");
        setPassword("");

        navigate("/dashboard");;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Server Error");
    }


  };

  return (
    <div className="container">
      <div className="card c2">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input className="form-control" type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="form-control" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;