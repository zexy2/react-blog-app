# Postify Blog

A simple React blog app built with Vite. Uses JSONPlaceholder API for demo data.

Live demo: https://zexy2.github.io/react-blog-app

## Features

- Browse posts from different authors
- View post details with comments
- Author profile pages
- Search across posts and authors
- Dark/light theme toggle
- Mobile responsive

## Tech Stack

- React 19
- React Router
- Axios
- Vite
- CSS Modules

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

Open http://localhost:5173 in your browser.

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Button/
│   ├── Header/
│   └── PostCard/
├── context/        # React context (search state)
├── pages/          # Route pages
└── main.jsx        # Entry point
```

## Notes

This is a learning project. The data comes from JSONPlaceholder, so it's all placeholder content.

## Author

Zeki Akgül - [GitHub](https://github.com/zexy2)
