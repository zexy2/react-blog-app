/**
 * Comment Section Component
 * 
 * Displays comments with nested replies
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaReply, FaEdit, FaTrash, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useComments } from '../../hooks/useComments';
import styles from './CommentSection.module.css';

const CommentSection = ({ postId }) => {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const {
    comments,
    count,
    isLoading,
    addComment,
    updateComment,
    deleteComment,
    likeComment,
    isAdding,
  } = useComments(postId);

  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    await addComment(newComment, replyTo);
    setNewComment('');
    setReplyTo(null);
  };

  const handleEdit = async (commentId) => {
    if (!editContent.trim()) return;
    await updateComment(commentId, editContent);
    setEditingId(null);
    setEditContent('');
  };

  const handleDelete = async (commentId) => {
    if (window.confirm(t('comments.confirmDelete'))) {
      await deleteComment(commentId);
    }
  };

  const startEdit = (comment) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return t('time.justNow');
    if (diffMins < 60) return t('time.minutesAgo', { count: diffMins });
    if (diffHours < 24) return t('time.hoursAgo', { count: diffHours });
    if (diffDays < 7) return t('time.daysAgo', { count: diffDays });
    return date.toLocaleDateString();
  };

  const renderComment = (comment, isReply = false) => (
    <div
      key={comment.id}
      className={`${styles.comment} ${isReply ? styles.reply : ''} ${
        comment.isOptimistic ? styles.optimistic : ''
      }`}
    >
      <img
        src={comment.author?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author?.username}`}
        alt={comment.author?.full_name}
        className={styles.avatar}
      />

      <div className={styles.commentContent}>
        <div className={styles.commentHeader}>
          <span className={styles.authorName}>{comment.author?.full_name}</span>
          <span className={styles.authorUsername}>@{comment.author?.username}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.date}>{formatDate(comment.created_at)}</span>
          {comment.is_edited && (
            <span className={styles.edited}>({t('comments.edited')})</span>
          )}
        </div>

        {editingId === comment.id ? (
          <div className={styles.editForm}>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className={styles.editTextarea}
              rows={3}
            />
            <div className={styles.editActions}>
              <button onClick={() => handleEdit(comment.id)} className={styles.saveBtn}>
                {t('common.save')}
              </button>
              <button onClick={cancelEdit} className={styles.cancelBtn}>
                {t('common.cancel')}
              </button>
            </div>
          </div>
        ) : (
          <p className={styles.commentText}>{comment.content}</p>
        )}

        <div className={styles.commentActions}>
          <button
            className={styles.actionBtn}
            onClick={() => likeComment(comment.id)}
            disabled={!isAuthenticated}
          >
            {comment.liked ? <FaHeart className={styles.liked} /> : <FaRegHeart />}
            {comment.likes_count > 0 && <span>{comment.likes_count}</span>}
          </button>

          {isAuthenticated && !isReply && (
            <button
              className={styles.actionBtn}
              onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
            >
              <FaReply />
              {t('comments.reply')}
            </button>
          )}

          {user?.id === comment.author?.id && (
            <>
              <button className={styles.actionBtn} onClick={() => startEdit(comment)}>
                <FaEdit />
                {t('common.edit')}
              </button>
              <button
                className={`${styles.actionBtn} ${styles.deleteBtn}`}
                onClick={() => handleDelete(comment.id)}
              >
                <FaTrash />
                {t('common.delete')}
              </button>
            </>
          )}
        </div>

        {replyTo === comment.id && (
          <form onSubmit={handleSubmit} className={styles.replyForm}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={t('comments.replyPlaceholder', { name: comment.author?.full_name })}
              className={styles.replyTextarea}
              rows={2}
            />
            <div className={styles.replyActions}>
              <button type="submit" disabled={isAdding || !newComment.trim()}>
                {isAdding ? t('common.sending') : t('comments.reply')}
              </button>
              <button type="button" onClick={() => setReplyTo(null)}>
                {t('common.cancel')}
              </button>
            </div>
          </form>
        )}

        {comment.replies?.length > 0 && (
          <div className={styles.replies}>
            {comment.replies.map((reply) => renderComment(reply, true))}
          </div>
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.skeleton} />
        <div className={styles.skeleton} />
        <div className={styles.skeleton} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {t('comments.title')} ({count})
      </h2>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <img
            src={user?.profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
            alt={user?.profile?.full_name}
            className={styles.formAvatar}
          />
          <div className={styles.formContent}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={t('comments.placeholder')}
              className={styles.textarea}
              rows={3}
            />
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isAdding || !newComment.trim()}
            >
              {isAdding ? t('common.sending') : t('comments.submit')}
            </button>
          </div>
        </form>
      ) : (
        <p className={styles.loginPrompt}>
          {t('comments.loginToComment')}
        </p>
      )}

      <div className={styles.commentList}>
        {comments.length === 0 ? (
          <p className={styles.noComments}>{t('comments.noComments')}</p>
        ) : (
          comments.map((comment) => renderComment(comment))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
