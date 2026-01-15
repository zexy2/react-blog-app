import React, { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import PostCard from "../components/PostCard/PostCard";
import { SearchContext } from "../context/SearchContext";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchQuery } = useContext(SearchContext);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        axios.get("https://jsonplaceholder.typicode.com/posts"),
        axios.get("https://jsonplaceholder.typicode.com/users"),
      ]);

      const usersMap = usersResponse.data.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});
      setUsers(usersMap);

      const allPosts = postsResponse.data;
      const uniqueAuthors = [...new Set(allPosts.map((post) => post.userId))];
      const selectedAuthors = uniqueAuthors.slice(0, 10);

      const postsFromDifferentAuthors = allPosts
        .filter((post) => selectedAuthors.includes(post.userId))
        .reduce((acc, post) => {
          if (!acc.some((p) => p.userId === post.userId)) {
            acc.push(post);
          }
          return acc;
        }, []);

      setPosts(postsFromDifferentAuthors);
    } catch (err) {
      setError("Yazılar yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const normalizeText = (text) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, "")
      .trim();
  };

  const searchInText = (text, searchTerm) => {
    if (!text || !searchTerm) return false;
    const normalizedText = normalizeText(text);
    const normalizedSearchTerm = normalizeText(searchTerm);
    return normalizedText.includes(normalizedSearchTerm);
  };

  const filteredPosts = posts.filter((post) => {
    if (!searchQuery.trim()) return true;

    const author = users[post.userId];
    if (!author) return false;

    return (
      searchInText(post.title, searchQuery) ||
      searchInText(post.body, searchQuery) ||
      searchInText(author.name, searchQuery) ||
      searchInText(author.username, searchQuery) ||
      searchInText(author.email, searchQuery)
    );
  });

  if (isLoading) {
    return (
      <div
        className="container"
        style={{ textAlign: "center", padding: "40px" }}
      >
        <div
          style={{
            background: "var(--bg-secondary)",
            borderRadius: 18,
            boxShadow: "0 4px 20px var(--shadow-color)",
            padding: "32px 28px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "200px",
            transition: "background 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <div
            className="spinner"
            style={{
              border: "4px solid var(--border-color)",
              borderTop: "4px solid var(--gradient-start)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              animation: "spin 1s linear infinite",
              marginBottom: "20px",
            }}
          ></div>
          <p style={{ fontSize: "1.2rem", color: "var(--text-primary)" }}>
            Yazılar Yükleniyor...
          </p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="container"
        style={{ textAlign: "center", padding: "40px" }}
      >
        <p style={{ color: "red", fontSize: "1.2rem" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: 32, marginBottom: 32 }}>
      <h1
        style={{
          fontWeight: 800,
          fontSize: "2.5rem",
          marginBottom: 30,
          textAlign: "center",
          background:
            "linear-gradient(90deg, var(--gradient-start), var(--gradient-end))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Blog Yazıları
      </h1>
      {filteredPosts.length === 0 && searchQuery && (
        <p
          style={{
            textAlign: "center",
            padding: "20px",
            color: "var(--text-secondary)",
            background: "var(--bg-secondary)",
            borderRadius: "10px",
            marginTop: "20px",
            boxShadow: "0 2px 8px var(--shadow-color)",
            border: "1px solid var(--card-border)",
            transition:
              "background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
          }}
        >
          Arama sonucu bulunamadı.
        </p>
      )}
      {filteredPosts.map((post) => (
        <PostCard key={post.id} post={post} author={users[post.userId]} />
      ))}
    </div>
  );
};

export default HomePage;
