import { useState } from "react";
import { ApiBaseUrl } from "./config";
import "./Dashboard.css";
import { toast } from "react-toastify";

function CreatePost() {
    const token = localStorage.getItem("token");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            toast.error("Please select an image to upload");
            return;
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);
        try {
            const response = await fetch(`${ApiBaseUrl}addpost/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            const data = await response.json();
            if (data.status) {
                toast.success("Post Created Successfully");

                setTitle("");
                setDescription("");
                setImage(null);

                document.querySelector('input[type="file"]').value = "";
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error("Server Error");
        }
    };
    return (
        <div className="container">
            <div className="card c2">
                <h2>Create New Post</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className="form-control"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="form-control"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        className="form-control"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <button className="btn btn-warning">
                        Upload Post
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;