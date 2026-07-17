import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ApiBaseUrl } from "./config";
function VerifyEmail() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("Verifying...");
    useEffect(() => {
        const verify = async () => {
            try {
                const response = await fetch(`${ApiBaseUrl}verify/${token}`);
                const data = await response.json();
                if (data.status) {
                    setMessage("Email Verified Successfully.");
                    setTimeout(() => {
                        navigate("/");
                    }, 3000);
                } else {
                    setMessage(data.message);
                }
            } catch {
                setMessage("Verification Failed.");
            }
        };
        verify();
    }, []);
    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>{message}</h2>
        </div>
    );
}
export default VerifyEmail;