import React from "react";
import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="container" style={{ marginTop: 32, marginBottom: 32 }}>
      <div
        style={{
          background: "var(--bg-secondary)",
          borderRadius: 18,
          boxShadow: "0 2px 12px var(--shadow-color)",
          padding: "32px 28px",
        }}
      >
        <h1 style={{ fontWeight: 800, fontSize: "2.2rem", marginBottom: 24 }}>
          {t('about.title')}
        </h1>
        <div
          style={{
            fontSize: "1.1rem",
            lineHeight: 1.7,
            color: "var(--text-secondary)",
          }}
        >
          <p style={{ marginBottom: 24 }}>
            {t('about.description')}
          </p>
          <div style={{ marginBottom: 24 }}>
            <h3
              style={{
                fontWeight: 700,
                fontSize: "1.3rem",
                marginBottom: 12,
                color: "var(--text-primary)",
              }}
            >
              {t('about.technologies')}:
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li
                style={{
                  padding: "8px 0",
                  fontSize: "1.05rem",
                  color: "var(--text-secondary)",
                }}
              >
                • React
              </li>
              <li
                style={{
                  padding: "8px 0",
                  fontSize: "1.05rem",
                  color: "var(--text-secondary)",
                }}
              >
                • React Router
              </li>
              <li
                style={{
                  padding: "8px 0",
                  fontSize: "1.05rem",
                  color: "var(--text-secondary)",
                }}
              >
                • Axios
              </li>
              <li
                style={{
                  padding: "8px 0",
                  fontSize: "1.05rem",
                  color: "var(--text-secondary)",
                }}
              >
                • JSONPlaceholder API
              </li>
            </ul>
          </div>
          <div
            style={{
              background: "var(--bg-primary)",
              padding: "20px",
              borderRadius: 12,
              borderLeft: "4px solid #007bff",
            }}
          >
            <p style={{ margin: 0, fontWeight: 600, color: "#007bff" }}>
              {t('about.projectOwner')}:{" "}
              <a
                href="https://github.com/zexy2"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#007bff", textDecoration: "underline" }}
              >
                zexy2 (Zeki Akgül)
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
