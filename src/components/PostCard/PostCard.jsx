import React from "react";
import { Link } from "react-router-dom";
import styles from "./PostCard.module.css";
import Button from "../Button/Button";

const PostCard = ({ post, author }) => {
  if (!post) return null;

  const getInitial = (name) => {
    if (!name) return post.id.toString();
    const initial = name.charAt(0).toUpperCase();
    return initial;
  };

  const snippet = post.body.substring(0, 150) + "...";
  const avatarText = author ? getInitial(author.name) : post.id;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <Link to={`/users/${author?.id}`}>
          <div className={styles.avatar}>{avatarText}</div>
        </Link>
        <div className={styles.headerContent}>
          <h3 className={styles.cardTitle}>{post.title}</h3>
          {author && (
            <Link to={`/users/${author.id}`}>
              <div className={styles.cardMeta}>{author.name}</div>
            </Link>
          )}
        </div>
      </div>
      <div className={styles.body}>{snippet}</div>
      <div className={styles.buttonWrapper}>
        <Button to={`/posts/${post.id}`}>Detayı Gör</Button>
      </div>
    </div>
  );
};

export default PostCard;
