import { NavLink } from "react-router-dom";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
function Sidebar() {
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <aside className="sidebar">
      <h2>PhotoShare</h2>
      <nav>
        {!isLoggedIn ? (
          <>
            <NavLink to="/">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/dashboard">My Profile</NavLink>
            <NavLink to="/createpost"> Create Post </NavLink>
            <NavLink to="/posts"> All Posts </NavLink>
            <button className="logout" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;