
import { NavLink } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>My App</h2>

      <nav>
        <NavLink to="/">Login</NavLink>
        <NavLink to="/ForgotPassword">ForgotPassword</NavLink>
      </nav>
    </aside>
  );
}