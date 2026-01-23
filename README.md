# Postify Blog

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.8-764ABC?style=flat-square&logo=redux)
![React Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?style=flat-square&logo=reactquery)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

Modern blog uygulaması. React 19, Redux Toolkit ve TanStack Query kullanılarak geliştirildi.

**Demo:** [https://zexy2.github.io/react-blog-app](https://zexy2.github.io/react-blog-app)

## Features

- Post CRUD operations with rich text editor (TipTap)
- Bookmark system with localStorage persistence
- Multi-language support (TR/EN)
- Analytics dashboard with Recharts
- Dark/Light theme
- Debounced search
- PWA support
- Unit tests with Vitest

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── BookmarkButton/  # Bookmark toggle functionality
│   ├── Button/          # Base button component
│   ├── Header/          # Navigation header
│   ├── LanguageSwitcher/# i18n language toggle
│   ├── PostCard/        # Post display card
│   └── RichTextEditor/  # TipTap rich text editor
│
├── hooks/               # Custom React hooks
│   ├── useBookmarks.js  # Bookmark management
│   ├── useDebounce.js   # Value debouncing
│   ├── useLocalStorage.js # Persistent storage
│   ├── usePosts.js      # Post operations with React Query
│   ├── useSearch.js     # Search functionality
│   └── useTheme.js      # Theme management
│
├── lib/                 # Library configurations
│   ├── i18n.js          # i18next configuration
│   └── queryClient.js   # React Query client
│
├── pages/               # Route pages
│   ├── AnalyticsPage/   # Dashboard with charts
│   ├── AuthorPage/      # Author profile
│   ├── BookmarksPage/   # Saved posts
│   ├── CreatePostPage/  # Post creation
│   ├── HomePage/        # Post listing
│   └── PostPage/        # Post details
│
├── services/            # API layer
│   ├── api.js           # Axios instance & interceptors
│   ├── postService.js   # Post CRUD operations
│   └── userService.js   # User operations
│
├── store/               # Redux store
│   ├── index.js         # Store configuration
│   └── slices/          # Redux slices
│       ├── bookmarksSlice.js
│       ├── postsSlice.js
│       ├── uiSlice.js
│       └── userSlice.js
│
├── constants/           # App constants
├── context/             # React context
└── test/                # Test utilities
```

---

## Tech Stack

**Core:** React 19, React Router 7, Vite 7

**State:** Redux Toolkit, Redux Persist, TanStack Query v5

**UI:** CSS Modules, TipTap, Recharts, React Icons, React Hot Toast

**i18n:** i18next, react-i18next

**Testing:** Vitest, React Testing Library

**PWA:** Vite PWA Plugin, Workbox

---

## Getting Started

Requirements: Node.js 18+, npm 9+

```bash
git clone https://github.com/zexy2/react-blog-app.git
cd react-blog-app
npm install
npm run dev
```

Dev server runs at [http://localhost:5173](http://localhost:5173)

### Scripts

```bash
npm run dev          # development server
npm run build        # production build
npm run preview      # preview build
npm run test         # run tests
npm run test:coverage # coverage report
npm run lint         # lint code
```

---

## Usage Examples

Custom hooks:

```javascript
const { posts, isLoading, error } = usePosts();
const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
const { theme, toggleTheme } = useTheme();
```

Service layer:

```javascript
export const postService = {
  getAll: (params) => api.get('/posts', { params }),
  getById: (id) => api.get(`/posts/${id}`),
  create: (data) => api.post('/posts', data),
};
```

Query keys:

```javascript
export const postKeys = {
  all: ['posts'],
  lists: () => [...postKeys.all, 'list'],
  list: (filters) => [...postKeys.lists(), filters],
  detail: (id) => [...postKeys.all, 'detail', id],
};
```

---

## Testing

```bash
npm run test
npm run test -- --ui
npm run test:coverage
```

---

## i18n

Supports Turkish and English. Language preference stored in localStorage.

---

## API

Uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for demo data. Replace endpoints in `/src/services/` for production.

---

## License

MIT

---

## Author

**Zeki Akgül** - [@zexy2](https://github.com/zexy2)
