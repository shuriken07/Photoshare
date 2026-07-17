import "./sidebar.css";
import { ImageBaseUrl } from "../component/config";
import { useUser } from "../context/UserContext";
function Header() {
    const { user } = useUser();
    return (
        <header className="header">
            <h3>
                {user
                    ? `Welcome, ${user.username}`
                    : "Login"}
            </h3>
            {user?.profilePhoto && (
                <img src={`${ImageBaseUrl}${user.profilePhoto}`} alt="Profile" style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        objectFit: "cover",
                    }}/>
            )}
        </header>
    );
}
export default Header;