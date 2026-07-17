import { createContext, useContext, useEffect, useState } from "react";
import { ApiBaseUrl } from "../component/config";
const UserContext = createContext();
export function UserProvider({ children }) {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");
    const [user, setUser] = useState(null);
    const getUser = async () => {
        if (!token || !id) {
            setUser(null);
            return;
        }
        try {
            const response = await fetch(`${ApiBaseUrl}getuser/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data.status) {
                setUser(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getUser();
    }, []);
    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                getUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
export const useUser = () => useContext(UserContext);