import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Avatar bileşeni
  const Avatar = ({
    name,
    email,
    isAuthor = false,
    userId = null,
    size = 32,
    fontSize = 14,
  }) => {
    // Baş harfi al - yazarlar için isimden, yorumlar için emailden
    const getInitial = (name, email, isAuthor) => {
      if (isAuthor && name) {
        // Yazar için isimden al
        const nameParts = name.split(" ");
        return nameParts[0][0].toUpperCase();
      } else if (email) {
        // Yorum yapanlar için emailden al
        const atIndex = email.indexOf("@");
        if (atIndex > 0) {
          return email.substring(0, 1).toUpperCase();
        }
      }
      return "?";
    };

    const avatarStyle = {
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      background:
        "linear-gradient(135deg, var(--gradient-start) 60%, var(--gradient-end) 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontSize: `${fontSize}px`,
      fontWeight: "bold",
      flexShrink: 0,
      cursor: isAuthor ? "pointer" : "default",
      transition: isAuthor
        ? "transform 0.2s ease, box-shadow 0.2s ease"
        : "none",
    };

    const AvatarContent = () => (
      <div
        style={avatarStyle}
        onMouseOver={(e) => {
          if (isAuthor) {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow =
              "0 2px 8px rgba(0, 198, 255, 0.4)";
          }
        }}
        onMouseOut={(e) => {
          if (isAuthor) {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }
        }}
      >
        {getInitial(name, email, isAuthor)}
      </div>
    );

    return isAuthor && userId ? (
      <Link to={`/users/${userId}`} style={{ textDecoration: "none" }}>
        <AvatarContent />
      </Link>
    ) : (
      <AvatarContent />
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const postResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        setPost(postResponse.data);

        const [userResponse, commentsResponse] = await Promise.all([
          axios.get(
            `https://jsonplaceholder.typicode.com/users/${postResponse.data.userId}`
          ),
          axios.get(
            `https://jsonplaceholder.typicode.com/posts/${id}/comments`
          ),
        ]);

        setUser(userResponse.data);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container" style={{ marginTop: 32, marginBottom: 32 }}>
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px",
            color: "var(--text-secondary)",
            background: "var(--bg-secondary)",
            borderRadius: "10px",
            margin: "20px auto",
            maxWidth: "400px",
            boxShadow: "0 2px 12px var(--shadow-color)",
          }}
        >
          <div
            style={{
              fontSize: "1.2rem",
              fontWeight: "500",
              marginBottom: "10px",
            }}
          >
            Yazı Detayları Yükleniyor...
          </div>
          <div
            style={{
              width: "40px",
              height: "40px",
              margin: "10px auto",
              border: "3px solid var(--text-muted)",
              borderTop: "3px solid var(--text-primary)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  if (!post || !user) return null;

  return (
    <div className="container" style={{ marginTop: 32, marginBottom: 32 }}>
      {/* Blog Yazısı */}
      <div
        style={{
          background: "var(--bg-secondary)",
          borderRadius: "18px",
          boxShadow: "0 2px 12px var(--shadow-color)",
          padding: "32px 28px",
          marginBottom: "32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)",
          }}
        />
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            marginBottom: "24px",
            color: "var(--text-primary)",
            lineHeight: "1.3",
          }}
        >
          {post.title}
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
            padding: "8px 12px",
            background: "var(--bg-primary)",
            borderRadius: "8px",
            width: "fit-content",
          }}
        >
          <Avatar
            name={user.name}
            email={user.email}
            isAuthor={true}
            userId={user.id}
            size={40}
            fontSize={18}
          />
          <Link
            to={`/users/${user.id}`}
            style={{
              color: "var(--text-primary)",
              textDecoration: "none",
              fontSize: "0.95rem",
              fontWeight: "500",
              transition: "color 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginLeft: "10px",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#007bff")}
            onMouseOut={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
          >
            {user.name}
            <span
              style={{
                fontSize: "0.8rem",
                color: "var(--text-muted)",
              }}
            >
              • Yazar Profili
            </span>
          </Link>
        </div>
        <div
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.8",
            color: "var(--text-secondary)",
            marginBottom: "24px",
          }}
        >
          {post.body}
        </div>
      </div>

      {/* Yorumlar Bölümü */}
      <div
        style={{
          background: "var(--bg-secondary)",
          borderRadius: "18px",
          boxShadow: "0 2px 12px var(--shadow-color)",
          padding: "32px 28px",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            marginBottom: "24px",
            color: "var(--text-primary)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          Yorumlar
          <span
            style={{
              fontSize: "1rem",
              color: "var(--text-muted)",
              fontWeight: "500",
            }}
          >
            ({comments.length})
          </span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                background: "var(--bg-primary)",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid var(--border-color)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "12px",
                  gap: "12px",
                }}
              >
                <Avatar name={comment.name} email={comment.email} />
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      color: "var(--text-primary)",
                      margin: 0,
                      marginBottom: "4px",
                    }}
                  >
                    {comment.name}
                  </h3>
                  <span
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {comment.email}
                  </span>
                </div>
              </div>
              <p
                style={{
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.6",
                  fontSize: "1rem",
                }}
              >
                {comment.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
