# Project Management System

A comprehensive Project Management System built with Nuxt.js 3, featuring user authentication and full CRUD operations for project management. The application provides a complete solution for managing projects with different types and categories.
It was developed as part of a technical assessment and will undergo future improvements and enhancements.

## 🚀 Key Features

- **User Authentication**: Registration and login system with persistent sessions
- **Project Management**: Create, read, update, and delete projects
- **Category System**: Organize projects by categories
- **State Management**: Uses Pinia for centralized state management
- **Form Validation**: Implemented with Vee-Validate and Yup schemas
- **Mock API**: Uses JSON Server for development backend

## 🛠️ Technology Stack

- **Frontend**: Nuxt.js 3, Vue.js 3, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Form Validation**: Vee-Validate + Yup
- **HTTP Client**: Axios
- **Mock Backend**: JSON Server
- **Development**: ESLint, PostCSS, Autoprefixer

## 📁 Project Structure

- **Pages**: Authentication (login/register), project listing, project creation/editing, user profile
- **API**: RESTful endpoints for authentication and project management
- **Middleware**: Route protection and authentication guards
- **Composables**: Reusable authentication logic
- **Stores**: Centralized state management for projects
- **Database**: JSON file serving as mock database with users and projects

## How to Run the Project

### Prerequisites
- Node.js or Bun 
- npm, pnpm, yarn, or bun package manager

### Installation & Setup

1. **Install dependencies:**
```bash
# Using npm
npm install

# Using pnpm  
pnpm install

# Using yarn
yarn install

# Using bun
bun install
```

2. **Start the development servers:**

You need to run two servers simultaneously:

**Terminal 1 - Main Application:**
```bash
# Using npm
npm run dev

# Using pnpm
pnpm dev

# Using yarn  
yarn dev

# Using bun
bun run dev
```

**Terminal 2 - Mock API Server:**
```bash
# Using npm
npm run api

# Using pnpm  
pnpm api

# Using yarn
yarn api

# Using bun
bun run api
```

The application will be available at:
- **Frontend**: `http://localhost:3000`
- **API**: `http://localhost:3001`

### 🔐 Default Login Credentials

You can use the following test account:
- **Email**: `admin@email.com`
- **Password**: `123456`

or Create new account.

### 🏗️ Production Build

To build for production:
```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🗺️ Available Routes

- `/` - Home page (redirects based on authentication)
- `/login` - User login
- `/register` - User registration  
- `/projects` - Project listing and management
- `/projects/newProject` - Create new project
- `/projects/[id]` - View/edit specific project
- `/profile` - User profile management

The application includes proper authentication middleware, so protected routes will redirect unauthenticated users to the login page automatically.

## 📚 Additional Information

For more information about Nuxt.js, check out the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction).

For deployment information, refer to the [deployment documentation](https://nuxt.com/docs/getting-started/deployment).
