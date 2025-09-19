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

## ⚙️ Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/moturiphil/NaiCoverFrontend.git
cd NaiCoverFrontend
npm install

 ```

Start the Dev Server

 ```bash
npm run dev
```

Build for Production

```bash
npm run build
```

---

## ⚙️ Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| npm run dev     | Start dev server         |
| npm run build   | Build for production     |
| npm run preview | Preview production build |
| npm run lint    | Run ESLint               |
