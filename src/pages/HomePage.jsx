/**
 * HomePage Component
 * Modern blog homepage with hero section and grid layout
 */

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FiPlus, FiSearch, FiArrowRight, FiTrendingUp } from 'react-icons/fi';
import PostCard from '../components/PostCard/PostCard';
import { usePosts } from '../hooks/usePosts';
import { useSearch } from '../hooks/useSearch';

const HomePage = () => {
  const { t } = useTranslation();
  const { posts, usersMap, isLoading, isError, error } = usePosts();
  const { query, debouncedQuery } = useSearch();
  const { isAuthenticated } = useSelector((state) => state.user);

  // Filter posts based on search
  const filteredPosts = useMemo(() => {
    if (!debouncedQuery.trim()) return posts;

    return posts.filter((post) => {
      const author = usersMap[post.userId];
      const searchFields = [
        post.title,
        post.body,
        author?.name,
        author?.username,
        author?.email,
      ].filter(Boolean);

      const normalizedQuery = debouncedQuery.toLowerCase();
      return searchFields.some((field) =>
        field.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [posts, usersMap, debouncedQuery]);

  // Loading State
  if (isLoading) {
    return (
      <div className="container" style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="animate-pulse" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 'var(--space-lg)',
        }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={{
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-xl)',
              height: '280px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-md)',
                marginBottom: 'var(--space-lg)',
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-tertiary)',
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{
                    height: '20px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: 'var(--space-sm)',
                  }} />
                  <div style={{
                    height: '14px',
                    width: '60%',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-sm)',
                  }} />
                </div>
              </div>
              <div style={{
                height: '60px',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
              }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="container" style={{ padding: 'var(--space-3xl) 0', textAlign: 'center' }}>
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-3xl)',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'var(--error-light)',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--space-lg)',
          }}>
            <span style={{ fontSize: '28px' }}>😕</span>
          </div>
          <h3 style={{ marginBottom: 'var(--space-sm)' }}>{t('common.error')}</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>
            {error?.message || 'Bir hata oluştu'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: 'var(--space-sm) var(--space-xl)',
              background: 'var(--gradient-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            {t('common.retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section - Only show when not searching */}
      {!query && (
        <section style={{
          position: 'relative',
          padding: 'var(--space-3xl) 0',
          overflow: 'hidden',
        }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-2xl)',
              alignItems: 'center',
            }}>
              {/* Hero Text */}
              <div className="animate-fadeInUp">
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-sm)',
                  padding: 'var(--space-xs) var(--space-md)',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '600',
                  marginBottom: 'var(--space-lg)',
                }}>
                  <FiTrendingUp size={14} />
                  {t('posts.latestPosts')}
                </span>
                
                <h1 style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: '800',
                  lineHeight: '1.1',
                  marginBottom: 'var(--space-lg)',
                  letterSpacing: '-0.03em',
                }}>
                  <span style={{
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Postify
                  </span>
                  <br />
                  Blog
                </h1>
                
                <p style={{
                  fontSize: 'var(--text-lg)',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.7',
                  marginBottom: 'var(--space-xl)',
                  maxWidth: '500px',
                }}>
                  {t('about.description')}
                </p>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-md)',
                }}>
                  {isAuthenticated ? (
                    <Link
                      to="/posts/create"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--space-sm)',
                        padding: 'var(--space-md) var(--space-xl)',
                        background: 'var(--gradient-primary)',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: 'var(--radius-lg)',
                        fontWeight: '600',
                        fontSize: 'var(--text-base)',
                        boxShadow: 'var(--shadow-lg), 0 8px 32px rgba(59, 130, 246, 0.25)',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      <FiPlus size={20} />
                      {t('posts.createPost')}
                    </Link>
                  ) : (
                    <Link
                      to="/auth/register"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--space-sm)',
                        padding: 'var(--space-md) var(--space-xl)',
                        background: 'var(--gradient-primary)',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: 'var(--radius-lg)',
                        fontWeight: '600',
                        fontSize: 'var(--text-base)',
                        boxShadow: 'var(--shadow-lg), 0 8px 32px rgba(59, 130, 246, 0.25)',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      {t('auth.register')}
                      <FiArrowRight size={18} />
                    </Link>
                  )}
                  
                  <Link
                    to="/about"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 'var(--space-sm)',
                      padding: 'var(--space-md) var(--space-xl)',
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      borderRadius: 'var(--radius-lg)',
                      fontWeight: '600',
                      fontSize: 'var(--text-base)',
                      border: '1px solid var(--border-color)',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    {t('nav.about')}
                  </Link>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'var(--space-md)',
              }} className="animate-fadeInUp" >
                {[
                  { label: t('analytics.totalPosts'), value: posts.length, icon: '📝' },
                  { label: t('analytics.totalAuthors'), value: Object.keys(usersMap).length, icon: '✍️' },
                  { label: t('analytics.totalComments'), value: posts.length * 5, icon: '💬' },
                  { label: t('bookmarks.title'), value: '∞', icon: '🔖' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-xl)',
                      padding: 'var(--space-xl)',
                      textAlign: 'center',
                      transition: 'all var(--transition-base)',
                    }}
                    className="card"
                  >
                    <span style={{ fontSize: '2rem', marginBottom: 'var(--space-sm)', display: 'block' }}>
                      {stat.icon}
                    </span>
                    <div style={{
                      fontSize: 'var(--text-3xl)',
                      fontWeight: '800',
                      color: 'var(--text-primary)',
                      marginBottom: 'var(--space-xs)',
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-muted)',
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Posts Section */}
      <section className="container" style={{ paddingBottom: 'var(--space-3xl)' }}>
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-xl)',
          flexWrap: 'wrap',
          gap: 'var(--space-md)',
        }}>
          <div>
            <h2 style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: '700',
              marginBottom: 'var(--space-xs)',
            }}>
              {query ? `"${query}" ${t('common.search')}` : t('posts.allPosts')}
            </h2>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: 'var(--text-sm)',
            }}>
              {filteredPosts.length} {t('posts.title').toLowerCase()}
            </p>
          </div>
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && query && (
          <div style={{
            textAlign: 'center',
            padding: 'var(--space-3xl)',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-color)',
          }}>
            <FiSearch size={48} style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-lg)' }} />
            <h3 style={{ marginBottom: 'var(--space-sm)' }}>{t('common.noResults')}</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              "{query}" {t('common.noResultsFor')}
            </p>
          </div>
        )}

        {/* Posts Grid - Bento Style */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 'var(--space-lg)',
        }}>
          {filteredPosts.slice(0, 20).map((post, index) => (
            <div
              key={post.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <PostCard post={post} author={usersMap[post.userId]} />
            </div>
          ))}
        </div>

        {/* Load More */}
        {filteredPosts.length > 20 && (
          <div style={{
            textAlign: 'center',
            marginTop: 'var(--space-2xl)',
          }}>
            <button
              style={{
                padding: 'var(--space-md) var(--space-2xl)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              {t('common.loadMore')}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
