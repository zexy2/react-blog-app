# Postify Blog

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.8-764ABC?style=flat-square&logo=redux)
![React Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?style=flat-square&logo=reactquery)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat-square&logo=pwa)

A modern, production-ready blog application built with React 19 and cutting-edge technologies. Features a clean architecture with proper separation of concerns, comprehensive state management, and professional development practices.

🔗 **Live Demo:** [https://zexy2.github.io/Blog-app-with-React-and-Redux](https://zexy2.github.io/Blog-app-with-React-and-Redux)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📝 **CRUD Operations** | Create, read, update posts with rich text editor |
| 🔖 **Bookmarks** | Save favorite posts with persistent storage |
| 🌍 **i18n Support** | Multi-language support (Turkish & English) |
| 📊 **Analytics Dashboard** | Visual insights with interactive charts |
| 🎨 **Rich Text Editor** | TipTap-powered editor with formatting tools |
| 🌙 **Theme Toggle** | Dark/Light mode with system preference detection |
| 🔍 **Smart Search** | Debounced search across posts and authors |
| 📱 **PWA Ready** | Installable app with offline support |
| ✅ **Unit Tests** | Comprehensive test coverage with Vitest |

---

## 🏗️ Architecture

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

## 🛠️ Tech Stack

### Core
- **React 19** - Latest React with concurrent features
- **React Router 7** - Client-side routing
- **Vite 7** - Next-generation build tool

### State Management
- **Redux Toolkit** - Predictable state container
- **Redux Persist** - State persistence
- **TanStack Query v5** - Server state management with caching

### UI & Styling
- **CSS Modules** - Scoped styling
- **TipTap** - Headless rich text editor
- **Recharts** - Composable charting library
- **React Icons** - Icon library
- **React Hot Toast** - Notifications

### Internationalization
- **i18next** - Full i18n support
- **react-i18next** - React bindings

### Testing
- **Vitest** - Fast unit testing
- **React Testing Library** - Component testing
- **Testing Library User Event** - User interaction simulation

### PWA & Build
- **Vite PWA Plugin** - PWA generation
- **Workbox** - Service worker & caching

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/zexy2/react-blog-app.git
cd react-blog-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run unit tests |
| `npm run test:coverage` | Run tests with coverage |
| `npm run lint` | Lint codebase |

---

## 📁 Key Patterns

### Custom Hooks
All data fetching and state logic is abstracted into custom hooks for reusability:

```javascript
const { posts, isLoading, error } = usePosts();
const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
const { theme, toggleTheme } = useTheme();
```

### Service Layer
API calls are centralized in service modules with proper error handling:

```javascript
// services/postService.js
export const postService = {
  getAll: (params) => api.get('/posts', { params }),
  getById: (id) => api.get(`/posts/${id}`),
  create: (data) => api.post('/posts', data),
  // ...
};
```

### Query Key Factory
React Query keys are organized with a factory pattern:

```javascript
export const postKeys = {
  all: ['posts'],
  lists: () => [...postKeys.all, 'list'],
  list: (filters) => [...postKeys.lists(), filters],
  details: () => [...postKeys.all, 'detail'],
  detail: (id) => [...postKeys.details(), id],
};
```

---

## 🧪 Testing

The project includes comprehensive unit tests:

```bash
# Run tests
npm run test

# Run with UI
npm run test -- --ui

# Generate coverage report
npm run test:coverage
```

### Test Structure
```
src/
├── hooks/
│   ├── useBookmarks.test.jsx
│   └── useDebounce.test.jsx
├── components/
│   └── PostCard.test.jsx
└── test/
    ├── setup.js          # Test configuration
    └── utils.jsx         # Test utilities
```

---

## 🌐 Internationalization

The app supports multiple languages with i18next:

- 🇹🇷 Turkish (Türkçe)
- 🇬🇧 English

Language preference is persisted in localStorage and syncs across tabs.

---

## 📊 Analytics Dashboard

Visual insights powered by Recharts:
- Post distribution by author
- Engagement metrics
- Trend analysis
- Interactive charts (Bar, Pie, Line)

---

## 🔐 Data Source

This application uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) as a demo API. In a production environment, you would replace the API endpoints in `/src/services/` with your actual backend.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Zeki Akgül**

- GitHub: [@zexy2](https://github.com/zexy2)

---

## 🙏 Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for the demo API
- [TipTap](https://tiptap.dev/) for the rich text editor
- [Recharts](https://recharts.org/) for the charting library
