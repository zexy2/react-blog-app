import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

const UserPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const [userResponse, postsResponse] = await Promise.all([
          axios.get(`https://jsonplaceholder.typicode.com/users/${id}`),
          axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`),
        ]);

        setUser(userResponse.data);
        setPosts(postsResponse.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        // Will show empty state
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchUserData();
    }
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
            {t('common.loadingAuthor')}
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

  if (!user) {
    return (
      <div className="container" style={{ marginTop: 32, marginBottom: 32 }}>
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px",
            color: "var(--text-secondary)",
            background: "var(--bg-secondary)",
            borderRadius: "10px",
          }}
        >
          <h2 style={{ color: "var(--text-primary)", marginBottom: "16px" }}>
            {t('common.authorNotFound')}
          </h2>
          <p>{t('errors.userNotFound')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: 32, marginBottom: 32 }}>
      {/* Yazar Profil Kartı */}
      <div
        style={{
          background: "var(--bg-secondary)",
          borderRadius: "18px",
          boxShadow: "0 2px 12px var(--shadow-color)",
          padding: "32px",
          marginBottom: "32px",
          textAlign: "center",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #007bff 60%, #00c6ff 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "2.5rem",
            fontWeight: "bold",
            margin: "0 auto 20px",
          }}
        >
          {user.name[0].toUpperCase()}
        </div>

        {/* Yazar Adı */}
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "var(--text-primary)",
            marginBottom: "16px",
            lineHeight: "1.2",
          }}
        >
          {user.name}
        </h1>

        {/* Kullanıcı Bilgileri */}
        <div
          style={{
            display: "grid",
            gap: "16px",
            maxWidth: "600px",
            margin: "0 auto",
            color: "var(--text-secondary)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: "8px",
              alignItems: "center",
              fontSize: "1.1rem",
              textAlign: "left",
            }}
          >
            <strong style={{ color: "var(--text-primary)" }}>
              Kullanıcı Adı:
            </strong>
            <span>{user.username}</span>

            <strong style={{ color: "var(--text-primary)" }}>Email:</strong>
            <a
              href={`mailto:${user.email}`}
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              {user.email}
            </a>

            <strong style={{ color: "var(--text-primary)" }}>Şehir:</strong>
            <span>{user.address?.city}</span>

            <strong style={{ color: "var(--text-primary)" }}>Website:</strong>
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              {user.website}
            </a>
          </div>
        </div>
      </div>

      {/* Yazarın Yazıları */}
      <h2
        style={{
          fontSize: "1.8rem",
          fontWeight: "700",
          color: "var(--text-primary)",
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        {user.name} Adlı Yazarın Yazıları ({posts.length})
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              background: "var(--bg-secondary)",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px var(--shadow-color)",
            }}
          >
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: "700",
                color: "var(--text-primary)",
                marginBottom: "12px",
              }}
            >
              {post.title}
            </h3>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.1rem",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              {post.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
