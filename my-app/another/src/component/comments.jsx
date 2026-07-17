import { useEffect, useState } from "react";
import { ApiBaseUrl } from "./config";
import { toast } from "react-toastify";
function Comments({ postId }) {
    const token = localStorage.getItem("token");
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const currentUser = localStorage.getItem("userId");
    const [editingComment, setEditingComment] = useState(null);
    const [editComment, setEditComment] = useState("");
    useEffect(() => {
        getComments();
    }, [postId]);
    const getComments = async () => {
        try {
            const response = await fetch(
                `${ApiBaseUrl}getcomments/${postId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            if (data.status) {
                setComments(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const addComment = async (e) => {
        e.preventDefault();
        if (comment.trim() === "") {
            toast.error("Comment cannot be empty");
            return;
        }
        try {
            const response = await fetch
                (`${ApiBaseUrl}addcomment`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            comment,
                            postId,
                        }),
                    }
                );
            const data = await response.json();
            if (data.status) {
                setComment("");
                getComments();
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const editCommentHandler = (item) => {
        setEditingComment(item._id);
        setEditComment(item.comment);
    };
    const updateComment = async (id) => {
        try {
            const response = await fetch(
                `${ApiBaseUrl}updatecomment/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        comment: editComment,
                    }),
                }
            );
            const data = await response.json();
            if (data.status) {
                toast.success(data.message);
                setEditingComment(null);
                getComments();
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const deleteComment = async (id) => {
        if (!window.confirm("Delete this comment?"))
            return;
        try {
            const response = await fetch(
                `${ApiBaseUrl}deletecomment/${id}`,
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
                getComments();
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="mt-4">
            <h4 style={{ margin: "5px 0" }} >Comments:</h4>
            <form onSubmit={addComment}>
                <div style={{ display: "flex", alignItems: "stretch", gap: "12px", marginBottom: "15px" }}>
                    <input className="form-control mb-2" placeholder="Write a comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                    <button className="btn btn-primary mb-3 " type="submit" style={{ height: "48px", minWidth: "140px", display: "flex", alignItems: "center", justifyContent: "center", }} su>
                        Add Comment
                    </button>
                </div>
            </form>
            {comments.length === 0 ? (
                <p>No comments yet.</p>
            ) : (
                comments.map((item) => (
                    <div key={item._id}>
                        <strong>
                            {item.userId?.username}
                        </strong>
                        {editingComment === item._id ? (
                            <>
                                <input className="form-control my-2" value={editComment} onChange={(e) => setEditComment(e.target.value)} />
                                <button className="btn btn-success btn-sm" onClick={() => updateComment(item._id)} >
                                    Save
                                </button>
                            </>
                        ) : (
                            <p className="mb-0">
                                {item.comment}
                            </p>
                        )}
                        {(item.userId?._id === currentUser ||
                            item.postId?.userId === currentUser) && (
                                <div className="mt-2 mb-3">
                                    <button className="btn btn-primary btn-sm me-2" onClick={() => editCommentHandler(item)}>
                                        Edit
                                    </button>

                                    <button className="btn btn-danger btn-sm" onClick={() => deleteComment(item._id)} >
                                        Delete
                                    </button>
                                </div>
                            )}
                    </div>
                ))
            )}
        </div>
    );
}
export default Comments;