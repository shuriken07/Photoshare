import { useEffect, useState } from "react";
import { ApiBaseUrl } from "./config";

function API({ refresh, deletePost, startEdit }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, [refresh]);

  const getPosts = async () => {
    try {
      const response = await fetch(`${ApiBaseUrl}getpost`);
      const data = await response.json();
      setPosts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>All Posts</h3>

      {posts.length === 0 ? (
        <p>No Posts Available</p>
      ) : (
        posts.map((post) => (
          <div key={post._id}>
            <h4>{post.postName}</h4>
            <p>{post.description}</p>

            <button
              className="edit-btn"
              onClick={() => startEdit(post)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => deletePost(post._id)}
            >
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default API;