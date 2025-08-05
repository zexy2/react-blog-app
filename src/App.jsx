import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import UserPage from "./pages/UserPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Header from "./components/Header/Header";

function App() {
  return (
    <div>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
