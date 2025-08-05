import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const PostDetailPage = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        const commentsResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );

        setPost(postResponse.data);
        setComments(commentsResponse.data);

        const userId = postResponse.data.userId;
        const userResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        setUser(userResponse.data);
      } catch (error) {
        console.error("Detay verilerini çekerken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (!post) {
    return <div>Yazı bulunamadı</div>;
  }

  return (
    <div className="container" style={{ marginTop: 32, marginBottom: 32 }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          padding: "32px 28px",
          marginBottom: 32,
        }}
      >
        <h1 style={{ fontWeight: 800, fontSize: "2.2rem", marginBottom: 12 }}>
          {post.title}
        </h1>
        {user && (
          <div style={{ marginBottom: 18 }}>
            <Link
              to={`/users/${user.id}`}
              style={{
                display: "inline-block",
                background: "linear-gradient(90deg, #007bff 60%, #00c6ff 100%)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.05rem",
                padding: "8px 22px",
                borderRadius: 8,
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(0,123,255,0.08)",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background =
                  "linear-gradient(90deg, #0056b3 60%, #007bff 100%)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background =
                  "linear-gradient(90deg, #007bff 60%, #00c6ff 100%)")
              }
            >
              Yazarı Gör: {user.name}
            </Link>
          </div>
        )}
        <div
          style={{
            fontSize: "1.15rem",
            color: "#222",
            lineHeight: 1.7,
            marginBottom: 18,
          }}
        >
          {post.body}
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <h3 style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: 18 }}>
          Yorumlar ({comments.length})
        </h3>
        <div className="comment-list">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="comment-card"
              style={{
                background: "#f5f7fa",
                borderRadius: 10,
                padding: "16px 18px",
                marginBottom: 16,
                boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontWeight: 700, color: "#111", marginBottom: 4 }}>
                {comment.name}{" "}
                <span
                  style={{
                    fontWeight: 400,
                    color: "#888",
                    fontSize: "0.98rem",
                  }}
                >
                  ({comment.email})
                </span>
              </div>
              <div style={{ color: "#222", fontSize: "1.05rem" }}>
                {comment.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
