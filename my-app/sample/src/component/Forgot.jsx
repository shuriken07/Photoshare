import { useState } from "react";
import "./Login.css";

function Forgot() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log( email);
    alert("Password reset link sent!");
    setEmail("");
  };

  return (
    <div className="container">
      <div className="card naitik">
        <h2 className="form-label">Forgot Password</h2>
        <br/>
        <br/>
        <br/>
        <form onSubmit={handleSubmit}>
          <input className="form-control" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <br/>
          <br/>
          <button className="btn btn-warning w-100" type="submit">
            Send Reset Link
          </button>
        </form>
        <br/>
        <br/>

        <a href="http://localhost:5173/" style={{ fontSize: "10px" }}>
          Back to Login
        </a>
      </div>
    </div>
  );
}

export default Forgot;