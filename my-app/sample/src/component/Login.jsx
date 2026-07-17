import { useState } from "react";
import './Login.css';

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name,password);
        setName("");
        setPassword("");
  };

  return(
    <div className="container">
        <div className= "card c2">
            <h2 className="form-label">Login</h2>
            <br/>
            <br/>
            <br/>
            <form onSubmit={handleSubmit}>
                <input className="form-control"type="text" placeholder="Username" value={name} required onChange={(e) => setName(e.target.value)}/>
                <br/>
                <br/>
                <input className="form-control" type="password" placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <br/>
                <button  className="btn btn-warning w-100" type="submit">Submit</button>
            </form>
            <br/>
            <br/>
            <br/>
            <a href="http://localhost:5173/ForgotPassword" style={{fontSize:"10px"}}>Forgot Password</a>
      

        </div>
    </div>
  );
}

export default Login;