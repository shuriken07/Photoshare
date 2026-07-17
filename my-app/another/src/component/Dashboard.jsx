import { useState, useEffect } from "react";
import "./Dashboard.css";
import { toast } from "react-toastify";
import { ApiBaseUrl, ImageBaseUrl } from "./config.js";
import { useUser } from "../context/UserContext";
function Dashboard() {
  const id = localStorage.getItem("userId");
  const { setUser: setContextUser } = useUser();
  const token = localStorage.getItem("token");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [user, setUser] = useState({
    username: "",
    phone: "",
    email: "",
    roles: [],
  });
  const [editedUser, setEditedUser] = useState({
    username: "",
    phone: "",
    email: "",
    roles: [],
  });
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState(null);
  useEffect(() => {
    getUser();
    getMyPosts();
  }, []);
  const getUser = async () => {
    try {
      const response = await fetch(`${ApiBaseUrl}getuser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.status) {
        setUser(data.data);
        setContextUser(data.data);
        setEditedUser(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getMyPosts = async () => {
    try {
      const response = await fetch(`${ApiBaseUrl}getposts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.status) {
        const myPosts = data.data.filter(
          (post) => post.userId?._id === id
        );

        setPosts(myPosts);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      roles: checked
        ? [...prev.roles, value]
        : prev.roles.filter((role) => role !== value),
    }));
  };
  const updateUser = async () => {
    try {
      const formData = new FormData();

      formData.append("username", editedUser.username);
      formData.append("phone", editedUser.phone);
      formData.append("email", editedUser.email);

      editedUser.roles.forEach((role) => {
        formData.append("roles", role);
      });

      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }
      const response = await fetch(`${ApiBaseUrl}updateuser/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (data.status) {
        setUser(data.data);
        setContextUser(data.data);
        setEditedUser(data.data);
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to update");
    }
  }
  const editPost = (post) => {
    setEditingPost(post._id);
    setEditTitle(post.title);
    setEditDescription(post.description);
    setEditImage(null);
  };
  const updatePost = async () => {
    const formData = new FormData();
    formData.append("title", editTitle);
    formData.append("description", editDescription);
    if (editImage) {
      formData.append("image", editImage);
    }
    try {
      const response = await fetch(
        `${ApiBaseUrl}updatepost/${editingPost}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (data.status) {
        toast.success("Post Updated");
        setEditingPost(null);
        getMyPosts();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deletePost = async (postId) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      const response = await fetch(
        `${ApiBaseUrl}deletepost/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.status) {
        toast.success(data.message);
        getMyPosts();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container">
      <div className="card c2">
        <h2>Profile</h2>
        <h3>Username</h3>
        <input className="form-control" value={editedUser.username} onChange={(e) =>
          setEditedUser((prev) => ({
            ...prev,
            username: e.target.value,
          }))
        } />
        <hr />
        <h3>Phone</h3>
        <input className="form-control" value={editedUser.phone} onChange={(e) => setEditedUser((prev) => ({
          ...prev,
          phone: e.target.value,
        }))
        } />
        <hr />
        <h3>Email</h3>
        <input className="form-control" value={editedUser.email} onChange={(e) =>
          setEditedUser((prev) => ({
            ...prev,
            email: e.target.value,
          }))
        } />
        <hr />
        {user.profilePhoto && (
          <img src={`${ImageBaseUrl}${user.profilePhoto}`} alt="Profile" style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "15px",
            }} />
        )}
        <h3>Profile Picture</h3>
        <input type="file" className="form-control" accept="image/*" onChange={(e) => setProfilePhoto(e.target.files[0])} />
        <hr />
        <h3>Roles</h3>
        <div style={{ textAlign: "left" }}>
          <label>
            <input type="checkbox" value="React" checked={editedUser.roles.includes("React")} onChange={handleRoleChange} />
            React
          </label>
          <br />
          <label>
            <input type="checkbox" value="Node" checked={editedUser.roles.includes("Node")} onChange={handleRoleChange} />
            Node
          </label>
          <br />
          <label>
            <input type="checkbox" value="HTML" checked={editedUser.roles.includes("HTML")} onChange={handleRoleChange} />
            HTML
          </label>
        </div>
        <br />
        <button className="btn btn-success" onClick={updateUser} >
          Update Profile
        </button>
        <hr />
        <h2>My Posts</h2>
        {posts.length === 0 ? (
          <p>You haven't uploaded any posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="mb-5">
              <img src={`${ImageBaseUrl}${post.image}`} alt={post.title} className="img-fluid rounded"
                style={{
                  maxWidth: "300px",
                  marginBottom: "15px",
                }}
              />
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <button className="btn btn-primary me-2" onClick={() => editPost(post)} >
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => deletePost(post._id)}>
                Delete
              </button>
              {editingPost === post._id && (
                <div className="mt-3">
                  <input className="form-control mb-2" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                  <textarea className="form-control mb-2" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                  <input className="form-control mb-2" type="file" onChange={(e) => setEditImage(e.target.files[0])} />
                  <button className="btn btn-success" onClick={updatePost} >
                    Save Changes
                  </button>
                </div>
              )}
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default Dashboard;