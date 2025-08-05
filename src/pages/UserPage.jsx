import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard/PostCard";

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        const postsResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${id}`
        );

        setUser(userResponse.data);
        setPosts(postsResponse.data);
      } catch (error) {
        console.error("Veri çekerken bir hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <h1>Yükleniyor...</h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container">
        <h1>Kullanıcı bulunamadı.</h1>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Yazar bilgi kartı */}
      <div className="user-info">
        <h1>{user.name}</h1>
        <p>
          <strong>Kullanıcı Adı:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Şehir:</strong> {user.address.city}
        </p>
        <p>
          <strong>Website:</strong>{" "}
          <a
            href={`http://${user.website}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.website}
          </a>
        </p>
      </div>

      <h2>{user.name} Adlı Kullanıcının Yazıları</h2>

      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default UserPage;
