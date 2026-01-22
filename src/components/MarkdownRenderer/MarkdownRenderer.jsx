/**
 * Markdown Renderer Component
 * 
 * Renders markdown content with syntax highlighting
 */

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import styles from './MarkdownRenderer.module.css';

const MarkdownRenderer = ({ content, className = '' }) => {
  return (
    <div className={`${styles.markdown} ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Custom heading with anchor links
          h1: ({ children, ...props }) => (
            <h1 className={styles.h1} {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className={styles.h2} {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className={styles.h3} {...props}>
              {children}
            </h3>
          ),
          // Custom link with external indicator
          a: ({ href, children, ...props }) => {
            const isExternal = href?.startsWith('http');
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={styles.link}
                {...props}
              >
                {children}
                {isExternal && <span className={styles.externalIcon}>↗</span>}
              </a>
            );
          },
          // Custom code blocks
          code: ({ inline, className, children, ...props }) => {
            if (inline) {
              return (
                <code className={styles.inlineCode} {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          // Custom pre for code blocks
          pre: ({ children, ...props }) => (
            <pre className={styles.codeBlock} {...props}>
              {children}
            </pre>
          ),
          // Custom blockquote
          blockquote: ({ children, ...props }) => (
            <blockquote className={styles.blockquote} {...props}>
              {children}
            </blockquote>
          ),
          // Custom table
          table: ({ children, ...props }) => (
            <div className={styles.tableWrapper}>
              <table className={styles.table} {...props}>
                {children}
              </table>
            </div>
          ),
          // Custom images
          img: ({ src, alt, ...props }) => (
            <figure className={styles.figure}>
              <img src={src} alt={alt} className={styles.image} {...props} />
              {alt && <figcaption className={styles.caption}>{alt}</figcaption>}
            </figure>
          ),
          // Custom list items with checkboxes (for task lists)
          li: ({ children, className, ...props }) => {
            if (className === 'task-list-item') {
              return (
                <li className={styles.taskListItem} {...props}>
                  {children}
                </li>
              );
            }
            return <li {...props}>{children}</li>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
