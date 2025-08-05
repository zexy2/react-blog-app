import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard/PostCard";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Yazilari alirken hata olustu", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <h1>Yazilar yukleniyor...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Blog Yazilari</h1>
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
