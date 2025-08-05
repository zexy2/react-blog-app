import React from "react";
import styles from "./PostCard.module.css";
import Button from "../Button/Button";

const PostCard = ({ post, author }) => {
  if (!post) return null;

  const snippet = post.body.substring(0, 100) + "...";

  const avatarText = author ? author.name[0].toUpperCase() : post.id;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.avatar}>{avatarText}</div>
        <div>
          <h3 className={styles.cardTitle}>{post.title}</h3>
          {author && (
            <div className={styles.cardMeta}>Yazar: {author.name}</div>
          )}
        </div>
      </div>
      <div className={styles.body}>{snippet}</div>
      <Button to={`/posts/${post.id}`}>Detayı Gör</Button>
    </div>
  );
};

export default PostCard;
