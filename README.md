# Postify Blog

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.8-764ABC?style=for-the-badge&logo=redux)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A production-ready, full-stack blog platform with modern architecture**

[Live Demo](https://zexy2.github.io/Blog-app-with-React-and-Redux) · [Report Bug](https://github.com/zexy2/Blog-app-with-React-and-Redux/issues) · [Request Feature](https://github.com/zexy2/Blog-app-with-React-and-Redux/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Performance](#performance)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Postify is a modern, scalable blog platform built with enterprise-grade architecture patterns. The application demonstrates best practices in React development, including proper separation of concerns, comprehensive state management, and production-ready security implementations.

### Why Postify?

- **Enterprise Architecture**: Clean separation between UI, business logic, and data layers
- **Type-Safe Operations**: Structured API responses with consistent error handling
- **Security First**: JWT-based authentication with role-based access control
- **Performance Optimized**: Lazy loading, code splitting, and intelligent caching strategies
- **Developer Experience**: Hot module replacement, comprehensive tooling, and clear documentation

---

## Key Features

### Core Functionality
| Feature | Description |
|---------|-------------|
| 📝 **Content Management** | Full CRUD operations with rich text editing (TipTap) |
| 🔐 **Authentication** | JWT-based auth with secure token refresh mechanism |
| 👥 **Role-Based Access** | Admin, Moderator, and User roles with granular permissions |
| 🛡️ **Admin Dashboard** | Complete user and content management interface |

### User Experience
| Feature | Description |
|---------|-------------|
| 🌍 **Internationalization** | Multi-language support (EN/TR) with i18next |
| 🌙 **Theme System** | Dark/Light mode with system preference detection |
| 📱 **Progressive Web App** | Installable with offline capabilities |
| 🔍 **Smart Search** | Debounced full-text search across content |

### Technical Excellence
| Feature | Description |
|---------|-------------|
| 📊 **Analytics Dashboard** | Interactive charts with Recharts |
| ⚡ **Performance** | Code splitting, lazy loading, optimized bundles |
| 🧪 **Testing** | Unit tests with Vitest, E2E with Playwright |
| 📦 **CI/CD Ready** | Docker support with multi-stage builds |

---

## Architecture

```
src/
├── components/              # Reusable UI components
│   ├── Header/             # Navigation with auth state
│   ├── Footer/             # Site footer
│   ├── ProtectedRoute/     # Route guard for auth
│   ├── PostCard/           # Post display component
│   ├── RichTextEditor/     # TipTap editor wrapper
│   └── ...
│
├── pages/                   # Route-level components
│   ├── HomePage/           # Post listing with filters
│   ├── AdminPage/          # Admin dashboard (RBAC)
│   ├── ProfilePage/        # User profile management
│   ├── CreatePostPage/     # Post creation/editing
│   └── ...
│
├── services/                # Business logic layer
│   ├── apiService.js       # RESTful API abstraction
│   ├── authService.js      # Authentication logic
│   ├── jwtService.js       # Token management
│   ├── adminService.js     # Admin operations
│   └── ...
│
├── store/                   # State management
│   ├── slices/
│   │   ├── userSlice.js    # User & auth state
│   │   ├── postsSlice.js   # Posts state
│   │   └── uiSlice.js      # UI preferences
│   └── index.js            # Store configuration
│
├── hooks/                   # Custom React hooks
│   ├── useAuth.js          # Authentication hook
│   ├── usePosts.js         # Posts with React Query
│   └── ...
│
├── lib/                     # External configurations
│   ├── supabase.js         # Database client
│   ├── i18n.js             # Internationalization
│   └── queryClient.js      # React Query setup
│
└── constants/               # Application constants
```

### Design Patterns

- **Service Layer Pattern**: All API calls abstracted through service modules
- **Repository Pattern**: Data access logic separated from business logic
- **Observer Pattern**: Real-time updates via Supabase subscriptions
- **Factory Pattern**: Dynamic component creation for admin dashboard

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI library with concurrent features |
| Redux Toolkit | Predictable state management |
| TanStack Query | Server state & caching |
| React Router 7 | Client-side routing |
| TipTap | Rich text editing |
| Recharts | Data visualization |

### Backend & Infrastructure
| Technology | Purpose |
|------------|---------|
| Supabase | PostgreSQL database & real-time |
| JWT | Stateless authentication |
| Vite 7 | Build tooling & HMR |
| Docker | Containerization |

### Quality & Testing
| Technology | Purpose |
|------------|---------|
| Vitest | Unit testing |
| Playwright | E2E testing |
| ESLint | Code linting |
| Prettier | Code formatting |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (optional - localStorage fallback available)

### Installation

```bash
# Clone repository
git clone https://github.com/zexy2/Blog-app-with-React-and-Redux.git
cd Blog-app-with-React-and-Redux

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev
```

### Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_APP_URL=http://localhost:5173
```

### Available Scripts

```bash
npm run dev       # Development server
npm run build     # Production build
npm run preview   # Preview production build
npm run test      # Run unit tests
npm run test:e2e  # Run E2E tests
npm run lint      # Lint codebase
```

---

## API Documentation

### RESTful Endpoints

The application implements a service-layer API architecture:

```javascript
// Posts API
api.posts.getAll({ page, limit, category })  // GET /api/v1/posts
api.posts.getById(id)                         // GET /api/v1/posts/:id
api.posts.create(data)                        // POST /api/v1/posts
api.posts.update(id, data)                    // PUT /api/v1/posts/:id
api.posts.delete(id)                          // DELETE /api/v1/posts/:id

// Users API
api.users.getById(id)                         // GET /api/v1/users/:id
api.users.update(id, data)                    // PUT /api/v1/users/:id

// Admin API (requires admin role)
api.analytics.getDashboard()                  // GET /api/v1/analytics
```

### Response Format

```javascript
{
  "data": { ... },
  "status": 200,
  "message": "Success",
  "timestamp": "2025-01-29T00:00:00.000Z",
  "api_version": "v1"
}
```

---

## Performance

### Lighthouse Scores

| Metric | Score |
|--------|-------|
| Best Practices | 100 |
| Accessibility | 95 |
| SEO | 90 |
| Performance | 76 |

### Optimizations Implemented

- **Code Splitting**: Route-based lazy loading
- **Bundle Optimization**: Vendor chunk separation
- **Image Optimization**: Lazy loading with placeholders
- **Caching Strategy**: Service worker with workbox
- **Tree Shaking**: Unused code elimination

---

## Security

### Authentication Flow

1. User submits credentials
2. Server validates and returns JWT + Refresh Token
3. Access token stored in memory, refresh token in httpOnly cookie
4. Token auto-refresh before expiration
5. Role-based route protection

### Security Features

- **JWT Authentication**: Stateless, scalable auth
- **Role-Based Access Control**: Admin, Moderator, User roles
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Token-based request validation

---

## Docker

```bash
# Build image
docker build -t postify-blog .

# Run container
docker run -p 80:80 postify-blog

# Or use docker-compose
docker-compose up -d
```

---

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Commit Convention

This project follows [Conventional Commits](https://conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `refactor:` Code refactoring
- `test:` Testing
- `chore:` Maintenance

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Author

**Zeki Akgul** - [GitHub](https://github.com/zexy2)

Project Link: [https://github.com/zexy2/Blog-app-with-React-and-Redux](https://github.com/zexy2/Blog-app-with-React-and-Redux)
