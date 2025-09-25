# NaiCover Frontend Setup Guide 🚀

This comprehensive guide will walk you through setting up the NaiCover frontend development environment on different operating systems.

## Table of Contents

- [System Requirements](#system-requirements)
- [Quick Start](#quick-start)
- [Detailed Setup Instructions](#detailed-setup-instructions)
- [Development Environment Configuration](#development-environment-configuration)
- [IDE Setup](#ide-setup)
- [Project Scripts](#project-scripts)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [Docker Setup (Optional)](#docker-setup-optional)

## System Requirements

### Minimum Requirements
- **Node.js**: v18.0.0 or later
- **npm**: v9.0.0 or later (comes with Node.js)
- **Git**: v2.30.0 or later
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space

### Recommended Requirements
- **Node.js**: v20.x.x (LTS)
- **npm**: v10.x.x or **yarn**: v4.x.x
- **RAM**: 16GB for optimal performance
- **SSD**: For faster build times

## Quick Start

```bash
# Clone the repository
git clone https://github.com/moturiphil/NaiCoverFrontend.git
cd NaiCoverFrontend

# Install dependencies
npm install

# Start development server
npm run dev

# Open your browser to http://localhost:5173
```

## Detailed Setup Instructions

### 1. Install Node.js and npm

#### Windows
1. **Download Node.js**
   - Visit [nodejs.org](https://nodejs.org/)
   - Download the LTS version (recommended)
   - Run the installer and follow the setup wizard

2. **Verify Installation**
   ```cmd
   node --version
   npm --version
   ```

#### macOS
1. **Using Homebrew** (recommended)
   ```bash
   # Install Homebrew if not already installed
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install Node.js
   brew install node
   ```

2. **Using Official Installer**
   - Download from [nodejs.org](https://nodejs.org/)
   - Run the .pkg installer

3. **Verify Installation**
   ```bash
   node --version
   npm --version
   ```

#### Linux (Ubuntu/Debian)
1. **Using NodeSource Repository** (recommended)
   ```bash
   # Add NodeSource repository
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   
   # Install Node.js
   sudo apt-get install -y nodejs
   ```

2. **Using Package Manager**
   ```bash
   sudo apt update
   sudo apt install nodejs npm
   ```

3. **Verify Installation**
   ```bash
   node --version
   npm --version
   ```

### 2. Install Git

#### Windows
- Download from [git-scm.com](https://git-scm.com/)
- Run the installer with recommended settings

#### macOS
```bash
# Using Homebrew
brew install git

# Or install Xcode Command Line Tools
xcode-select --install
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt install git

# CentOS/RHEL
sudo yum install git
```

### 3. Clone and Setup Project

1. **Clone Repository**
   ```bash
   git clone https://github.com/moturiphil/NaiCoverFrontend.git
   cd NaiCoverFrontend
   ```

2. **Install Dependencies**
   ```bash
   # Using npm
   npm install

   # Or using yarn (if preferred)
   yarn install
   ```

3. **Verify Installation**
   ```bash
   # Check if all dependencies installed correctly
   npm ls --depth=0
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   - Navigate to `http://localhost:5173`
   - You should see the NaiCover homepage

## Development Environment Configuration

### Node Version Management

#### Using nvm (Node Version Manager)

**Install nvm:**

*Windows (nvm-windows):*
- Download from [github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)
- Run the installer

*macOS/Linux:*
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload terminal or run:
source ~/.bashrc
```

**Use specific Node version:**
```bash
# Install and use Node.js v20
nvm install 20
nvm use 20

# Set as default
nvm alias default 20
```

### Package Manager Configuration

#### npm Configuration
```bash
# Set registry (if needed)
npm config set registry https://registry.npmjs.org/

# Increase memory limit for builds
npm config set max_old_space_size 4096

# Configure cache location
npm config set cache ~/.npm-cache
```

#### Yarn Configuration (Optional)
```bash
# Install Yarn globally
npm install -g yarn

# Install project dependencies with Yarn
yarn install

# Start development server with Yarn
yarn dev
```

## IDE Setup

### VS Code (Recommended)

1. **Install VS Code**
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)

2. **Install Recommended Extensions**
   ```json
   // .vscode/extensions.json (already included in project)
   {
     "recommendations": [
       "bradlc.vscode-tailwindcss",
       "esbenp.prettier-vscode",
       "ms-vscode.vscode-typescript-next",
       "formulahendry.auto-rename-tag",
       "christian-kohler.path-intellisense",
       "ms-vscode.vscode-json"
     ]
   }
   ```

3. **Configure VS Code Settings**
   ```json
   // .vscode/settings.json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     },
     "typescript.preferences.importModuleSpecifier": "relative",
     "emmet.includeLanguages": {
       "javascript": "javascriptreact",
       "typescript": "typescriptreact"
     }
   }
   ```

### Other IDEs

#### WebStorm
1. Enable TypeScript support
2. Configure Prettier and ESLint
3. Install Tailwind CSS plugin

#### Vim/Neovim
1. Install TypeScript language server
2. Configure CoC or native LSP
3. Add Tailwind CSS support

## Project Scripts

### Core Scripts

```bash
# Development
npm run dev          # Start development server (Vite)
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run type-check   # Run TypeScript compiler check

# Utilities
npm run clean        # Clean build artifacts
npm run format       # Format code with Prettier
```

### Custom Scripts (if added)

```bash
# Testing (if tests are added)
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report

# Analysis
npm run analyze      # Bundle analyzer
npm run check-deps   # Check for outdated dependencies
```

## Environment Variables

### Development Environment

Create a `.env.local` file in the project root:

```bash
# .env.local
# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_API_VERSION=v1

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEV_TOOLS=true

# Third-party Services
VITE_GOOGLE_ANALYTICS_ID=your_ga_id_here
VITE_SENTRY_DSN=your_sentry_dsn_here
```

### Environment-Specific Files

```
.env                # Default variables
.env.local          # Local overrides (git-ignored)
.env.development    # Development environment
.env.production     # Production environment
```

### Accessing Environment Variables

```typescript
// In your React components
const apiUrl = import.meta.env.VITE_API_URL;
const isProduction = import.meta.env.PROD;
const isDevelopment = import.meta.env.DEV;
```

## Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Error: Port 5173 is already in use
# Solution: Use different port
npm run dev -- --port 3000

# Or kill process using the port
lsof -ti:5173 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :5173   # Windows (find PID and kill)
```

#### 2. Node Modules Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 3. TypeScript Errors
```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
npm run build

# Check TypeScript configuration
npx tsc --noEmit
```

#### 4. Git Issues
```bash
# Reset to last commit
git reset --hard HEAD

# Clean untracked files
git clean -fd

# Pull latest changes
git pull origin main
```

### Performance Issues

#### Slow Build Times
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"

# Use faster package manager
npm install -g pnpm
pnpm install
```

#### Slow Development Server
```bash
# Disable some features for faster builds
# Add to vite.config.ts
export default defineConfig({
  server: {
    fs: {
      strict: false
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
```

### System-Specific Issues

#### Windows Specific
```bash
# Enable Developer Mode for symlinks
# Run PowerShell as Administrator
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux

# Use Windows Subsystem for Linux (WSL) for better performance
wsl --install
```

#### macOS Specific
```bash
# Install Xcode Command Line Tools if build fails
xcode-select --install

# Fix permission issues
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

## Docker Setup (Optional)

### Using Docker for Development

1. **Create Dockerfile**
   ```dockerfile
   # Dockerfile.dev
   FROM node:20-alpine

   WORKDIR /app

   COPY package*.json ./
   RUN npm ci

   COPY . .

   EXPOSE 5173

   CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
   ```

2. **Create Docker Compose**
   ```yaml
   # docker-compose.yml
   version: '3.8'
   services:
     app:
       build:
         context: .
         dockerfile: Dockerfile.dev
       ports:
         - "5173:5173"
       volumes:
         - .:/app
         - /app/node_modules
       environment:
         - CHOKIDAR_USEPOLLING=true
   ```

3. **Run with Docker**
   ```bash
   # Build and start
   docker-compose up --build

   # Stop
   docker-compose down
   ```

## Getting Help

- **Documentation Issues**: Create an issue on GitHub
- **Setup Problems**: Check the troubleshooting section or create a discussion
- **Community**: Join our Discord server (link in README)

---

Once you have everything set up, head over to the [CONTRIBUTING.md](./CONTRIBUTING.md) to learn about the development workflow and coding standards.