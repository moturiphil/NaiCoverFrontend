# NaiCover 🛡️  
A blazing-fast, fully responsive insurance aggregator landing page built with React, Vite, and TypeScript.

🔗 Project URL: https://github.com/moturiphil/NaiCoverFrontend

---

## 🚀 Overview

NaiCover is a marketing and onboarding landing page for an insurance aggregator platform. It allows users to explore, compare, and connect with multiple insurance providers—all through a sleek, responsive, and SEO-optimized interface.

---

## ✨ Features

- ⚡ Built with Vite for ultra-fast builds
- 💡 Developed using React 18 and TypeScript
- 🎨 Tailwind CSS for styling
- 🌙 Theme support with next-themes
- 🧱 Modular component system powered by Radix UI and shadcn/ui conventions
- 🧲 Drag-and-drop support via dnd-kit
- ✅ Integrated with react-hook-form and zod for validation
- 📊 Interactive charts with Recharts
- 💬 Toast notifications via Sonner
- 🔍 SEO and accessibility conscious

---

## 🧩 Dependencies

### Core

- react, react-dom
- react-router-dom
- vite
- next (used for theming / structure compatibility)
- tailwindcss, tailwindcss-animate, tailwind-merge
- typescript, class-variance-authority, clsx

### UI & Components

- @radix-ui/react-* (UI primitives)
- lucide-react (icons)
- framer-motion (animations)
- vaul (dialog primitives)
- sonner (toasts)

### Forms & Validation

- react-hook-form
- zod
- @hookform/resolvers

### Utilities

- @tanstack/react-table
- @dnd-kit/* (core, sortable, modifiers, utilities)
- next-themes

---

## 🧪 Dev Dependencies

- vite, @vitejs/plugin-react, @vitejs/plugin-react-swc
- tailwindcss, autoprefixer, postcss
- typescript, @types/*, typescript-eslint
- eslint, eslint-plugin-react-hooks, eslint-plugin-react-refresh
- globals

---

## 📚 Documentation

| Document | Description |
| -------- | ----------- |
| [SETUP.md](./SETUP.md) | Comprehensive setup guide for all operating systems |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Development workflow and contribution guidelines |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Deployment options and platform configurations |

## ⚙️ Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| npm run dev     | Start dev server         |
| npm run build   | Build for production     |
| npm run preview | Preview production build |
| npm run lint    | Run ESLint               |

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/moturiphil/NaiCoverFrontend.git
cd NaiCoverFrontend

# Install dependencies
npm install

# Start development server
npm run dev
```

For detailed setup instructions, see [SETUP.md](./SETUP.md).

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](./CONTRIBUTING.md) to get started.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed instructions.

## 🚀 Deployment

This application can be deployed on various platforms:

- **Vercel** (Recommended) - One-click deployment
- **Netlify** - Static site hosting with forms
- **AWS S3 + CloudFront** - Enterprise-grade hosting
- **Firebase Hosting** - Google's hosting platform
- **Traditional VPS** - Custom server deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/moturiphil/NaiCoverFrontend)

## 🏗️ Architecture

### Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite (ultra-fast builds)
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React hooks + Context API
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM

### Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── forms/          # Form components
│   └── ...             # Feature-specific components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── data/               # Static data and constants
├── assets/             # Images, fonts, etc.
└── app/                # Application pages
```
