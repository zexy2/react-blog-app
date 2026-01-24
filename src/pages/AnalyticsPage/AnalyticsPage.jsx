/**
 * AnalyticsPage Component
 * Dashboard with statistics and charts
 */

import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { FiFileText, FiUsers, FiMessageSquare, FiTrendingUp } from 'react-icons/fi';
import { usePosts } from '../../hooks/usePosts';
import styles from './AnalyticsPage.module.css';

const COLORS = ['#007bff', '#00c6ff', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#14b8a6'];

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className={styles.statCard}>
    <div className={styles.statIcon} style={{ background: color }}>
      <Icon size={24} />
    </div>
    <div className={styles.statContent}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  </div>
);

const AnalyticsPage = () => {
  const { t } = useTranslation();
  const { posts, users, usersMap, isLoading } = usePosts();

  // Calculate statistics
  const stats = useMemo(() => {
    if (!posts.length || !users.length) {
      return {
        totalPosts: 0,
        totalAuthors: 0,
        avgPostsPerAuthor: 0,
        postsByAuthor: [],
        topAuthors: [],
      };
    }

    // Posts by author
    const authorPostCounts = posts.reduce((acc, post) => {
      acc[post.userId] = (acc[post.userId] || 0) + 1;
      return acc;
    }, {});

    const postsByAuthor = Object.entries(authorPostCounts)
      .map(([userId, count]) => ({
        name: usersMap[userId]?.name?.split(' ')[0] || `User ${userId}`,
        posts: count,
        userId,
      }))
      .sort((a, b) => b.posts - a.posts);

    // Top 5 authors
    const topAuthors = postsByAuthor.slice(0, 5);

    // Simulate posts over time data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const postsOverTime = months.map((month, index) => ({
      name: month,
      posts: Math.floor(posts.length / 6) + Math.floor(Math.random() * 5),
      views: Math.floor(Math.random() * 1000) + 500,
    }));

    return {
      totalPosts: posts.length,
      totalAuthors: users.length,
      avgPostsPerAuthor: (posts.length / users.length).toFixed(1),
      postsByAuthor: postsByAuthor.slice(0, 10),
      topAuthors,
      postsOverTime,
    };
  }, [posts, users, usersMap]);

  if (isLoading) {
    return (
      <div className="container">
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t('analytics.title')}</h1>
          <p className={styles.subtitle}>
            {t('analytics.subtitle')}
          </p>
        </header>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <StatCard
            icon={FiFileText}
            label={t('analytics.totalPosts')}
            value={stats.totalPosts}
            color="linear-gradient(135deg, #007bff, #00c6ff)"
          />
          <StatCard
            icon={FiUsers}
            label={t('analytics.totalAuthors')}
            value={stats.totalAuthors}
            color="linear-gradient(135deg, #6366f1, #8b5cf6)"
          />
          <StatCard
            icon={FiMessageSquare}
            label={t('analytics.avgCommentsPerPost')}
            value={stats.avgPostsPerAuthor}
            color="linear-gradient(135deg, #ec4899, #f43f5e)"
          />
          <StatCard
            icon={FiTrendingUp}
            label="Trend"
            value="+12%"
            color="linear-gradient(135deg, #22c55e, #14b8a6)"
          />
        </div>

        {/* Charts */}
        <div className={styles.chartsGrid}>
          {/* Posts by Author - Bar Chart */}
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>{t('analytics.postsByAuthor')}</h3>
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.postsByAuthor}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                    axisLine={{ stroke: 'var(--border-color)' }}
                  />
                  <YAxis
                    tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                    axisLine={{ stroke: 'var(--border-color)' }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar
                    dataKey="posts"
                    fill="url(#colorGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#007bff" />
                      <stop offset="100%" stopColor="#00c6ff" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Authors - Pie Chart */}
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>{t('analytics.topAuthors')}</h3>
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.topAuthors}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="posts"
                    label={({ name }) => name}
                  >
                    {stats.topAuthors.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Posts Over Time - Line Chart */}
          <div className={`${styles.chartCard} ${styles.wideChart}`}>
            <h3 className={styles.chartTitle}>{t('analytics.postsOverTime')}</h3>
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.postsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                    axisLine={{ stroke: 'var(--border-color)' }}
                  />
                  <YAxis
                    tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                    axisLine={{ stroke: 'var(--border-color)' }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="posts"
                    stroke="#007bff"
                    strokeWidth={3}
                    dot={{ fill: '#007bff', strokeWidth: 2 }}
                    name="Yazılar"
                  />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={{ fill: '#22c55e', strokeWidth: 2 }}
                    name="Görüntüleme"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
