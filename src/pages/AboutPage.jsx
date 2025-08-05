import React from "react";

const AboutPage = () => {
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
          Hakkında
        </h1>

        <div style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "#222" }}>
          <p style={{ marginBottom: 20 }}>
            Postify Blog, yazılım ve teknoloji dünyasında güncel içerikler
            sunmak amacıyla hazırlanmış modern bir blog platformudur.
          </p>

          <p style={{ marginBottom: 20 }}>
            Bu projede, React ve JSONPlaceholder API kullanılarak çok sayfalı,
            kullanıcı ve yorum destekli bir blog uygulaması geliştirilmiştir.
          </p>

          <p style={{ marginBottom: 24 }}>
            Amacımız, yazılım öğrenenler ve teknoloji meraklıları için sade,
            hızlı ve ilham verici bir deneyim sunmaktır.
          </p>

          <div style={{ marginBottom: 24 }}>
            <h3
              style={{ fontWeight: 700, fontSize: "1.3rem", marginBottom: 12 }}
            >
              Kullanılan Teknolojiler:
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ padding: "8px 0", fontSize: "1.05rem" }}>• React</li>
              <li style={{ padding: "8px 0", fontSize: "1.05rem" }}>
                • React Router
              </li>
              <li style={{ padding: "8px 0", fontSize: "1.05rem" }}>• Axios</li>
              <li style={{ padding: "8px 0", fontSize: "1.05rem" }}>
                • JSONPlaceholder API
              </li>
            </ul>
          </div>

          <div
            style={{
              background: "#f8f9fa",
              padding: "20px",
              borderRadius: 12,
              borderLeft: "4px solid #007bff",
            }}
          >
            <p style={{ margin: 0, fontWeight: 600, color: "#007bff" }}>
              Proje sahibi:{" "}
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
