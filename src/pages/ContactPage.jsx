import React from "react";

const ContactPage = () => {
  return (
    <div className="container" style={{ marginTop: 32, marginBottom: 32 }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          padding: "32px 28px",
        }}
      >
        <h1 style={{ fontWeight: 800, fontSize: "2.2rem", marginBottom: 24 }}>
          İletişim
        </h1>

        <div style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "#222" }}>
          <p style={{ marginBottom: 24 }}>
            Blog ile ilgili görüş, öneri veya iş birliği talepleriniz için
            aşağıdaki kanallardan bana ulaşabilirsiniz:
          </p>

          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 16,
                padding: "16px",
                background: "#f8f9fa",
                borderRadius: 12,
                transition: "all 0.2s",
              }}
            >
              <div>
                <strong style={{ display: "block", marginBottom: 4 }}>
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
                background: "#f8f9fa",
                borderRadius: 12,
                transition: "all 0.2s",
              }}
            >
              <div>
                <strong style={{ display: "block", marginBottom: 4 }}>
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
                background: "#f8f9fa",
                borderRadius: 12,
                transition: "all 0.2s",
              }}
            >
              <div>
                <strong style={{ display: "block", marginBottom: 4 }}>
                  E-posta:
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
              background: "#e3f2fd",
              padding: "20px",
              borderRadius: 12,
              borderLeft: "4px solid #2196f3",
            }}
          >
            <p style={{ margin: 0, fontWeight: 600, color: "#1976d2" }}>
              Size en kısa sürede geri dönüş yapmaya çalışacağım!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
