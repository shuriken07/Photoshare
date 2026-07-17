import { useEffect, useState } from "react";
import { ApiBaseUrl } from "./config";
import { toast } from "react-toastify";
import greenButton from "./images/green_button.png";
import redButton from "./images/red_button.png";
import whiteButton from "./images/white_button.png";
function Likes({ postId }) {
    const token = localStorage.getItem("token");
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [myReaction, setMyReaction] = useState(null);
    useEffect(() => {
        getReactions();
    }, []);

    const getReactions = async () => {
        try {
            const response = await fetch(
                `${ApiBaseUrl}reactions/${postId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            if (data.status) {
                setLikes(data.data.likes);
                setDislikes(data.data.dislikes);
                setMyReaction(data.data.myReaction);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const react = async (reaction) => {
        try {
            const response = await fetch(
                `${ApiBaseUrl}react/${postId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        reaction,
                    }),
                }
            );
            const data = await response.json();
            if (data.status) {
                setLikes(data.data.likes);
                setDislikes(data.data.dislikes);
                setMyReaction(data.data.myReaction);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error("Server Error");
        }
    };
    return (
        <div
            style={{ display: "flex", gap: "25px", alignItems: "center", marginTop: "15px", marginBottom: "15px", }}  >
            <div style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", }} onClick={() => react("like")} >
                <img src={myReaction === "like" ? greenButton : whiteButton} width="35" alt="Like" />
                <span>{likes}</span>
            </div>

            <div style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", }} onClick={() => react("dislike")} >
                <img src={ myReaction === "dislike" ? redButton : whiteButton } width="35" alt="Dislike" />
                <span>{dislikes}</span>
            </div>
        </div>
    );
}
export default Likes;