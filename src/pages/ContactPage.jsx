import React from "react";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
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
          {t('contact.title')}
        </h1>
        <div
          style={{
            fontSize: "1.1rem",
            lineHeight: 1.7,
            color: "var(--text-secondary)",
          }}
        >
          <p style={{ marginBottom: 24 }}>
            {t('contact.description')}
          </p>
          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 16,
                padding: "16px",
                background: "var(--bg-primary)",
                borderRadius: 12,
                transition: "all 0.2s",
              }}
            >
              <div>
                <strong
                  style={{
                    display: "block",
                    marginBottom: 4,
                    color: "var(--text-primary)",
                  }}
                >
                  GitHub:
                </strong>
                <a
                  href="https://github.com/zexy2"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#007bff", textDecoration: "underline" }}
                >
                  https://github.com/zexy2
                </a>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 16,
                padding: "16px",
                background: "var(--bg-primary)",
                borderRadius: 12,
                transition: "all 0.2s",
              }}
            >
              <div>
                <strong
                  style={{
                    display: "block",
                    marginBottom: 4,
                    color: "var(--text-primary)",
                  }}
                >
                  LinkedIn:
                </strong>
                <a
                  href="https://www.linkedin.com/in/zeki-akgül"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#007bff", textDecoration: "underline" }}
                >
                  https://www.linkedin.com/in/zeki-akgül
                </a>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 16,
                padding: "16px",
                background: "var(--bg-primary)",
                borderRadius: 12,
                transition: "all 0.2s",
              }}
            >
              <div>
                <strong
                  style={{
                    display: "block",
                    marginBottom: 4,
                    color: "var(--text-primary)",
                  }}
                >
                  {t('contact.email')}:
                </strong>
                <a
                  href="mailto:zekiakgul09@gmail.com"
                  style={{ color: "#007bff", textDecoration: "underline" }}
                >
                  zekiakgul09@gmail.com
                </a>
              </div>
            </div>
          </div>
          <div
            style={{
              background: "rgba(33, 150, 243, 0.1)",
              padding: "20px",
              borderRadius: 12,
              borderLeft: "4px solid #2196f3",
            }}
          >
            <p style={{ margin: 0, fontWeight: 600, color: "#2196f3" }}>
              {t('contact.responseMessage')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
