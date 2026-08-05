import { useEffect, useState } from "react";
import { ApiBaseUrl, ImageBaseUrl } from "./config";
import { toast } from "react-toastify";
import Comments from "./comments";
import likes from "./likes";
import "./Dashboard.css";
function Posts() {
    const token = localStorage.getItem("token");
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    useEffect(() => {
        getPosts();
    }, [currentPage]);
    const getPosts = async () => {
        try {
            const response = await fetch(
                `${ApiBaseUrl}getposts?page=${currentPage}&limit=3`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            if (data.status) {
                setPosts(data.data);
                setTotalPages(data.totalPages);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error("Server Error");
        }
    };
    const searchPosts = async () => {
        try {
            const response = await fetch(
                `${ApiBaseUrl}getposts?page=1&limit=3&search=${search}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            if (data.status) {
                setPosts(data.data.posts);
                setCurrentPage(data.data.currentPage);
                setTotalPages(data.data.totalPages);
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
                <h2>All Posts</h2>
                <input
                    className="form-control" placeholder="Search by title" value={search} onChange={(e) => setSearch(e.target.value)} />
                <div className="button-group">
                    <button onClick={() => getPosts(1)}>Search</button>
                    <button onClick={() => {
                        setSearch("");
                        getPosts(1);
                    }}>
                        Show All
                    </button>
                </div>
                <hr />
                {posts.length === 0 ? (
                    <p className="text-center">No Posts Found.</p>
                ) : (
                    posts.map((post) => (
                        <div key={post._id} className="mb-5">
                            <img
                                src={`${ImageBaseUrl}${post.image}`} alt={post.title} className="img-fluid rounded"
                                style={{
                                    maxHeight: "350px",
                                    objectFit: "cover",
                                }}
                            />
                            <h3 className="mt-3">{post.title}</h3>
                            <p>{post.description}</p>
                            <p className="text-muted">
                                <strong>Posted by:</strong>{" "}
                                {post.userId?.username}
                            </p>
                            <Likes postId={post._id} />

                            <Comments postId={post._id} />
                            <hr />
                        </div>
                    ))
                )}
                <div className="pagination" >
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                        Previous
                    </button>
                    <span style={{ margin: "0 15px" }}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Posts;
