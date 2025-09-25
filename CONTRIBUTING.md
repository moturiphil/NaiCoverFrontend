# Contributing to NaiCover Frontend 🤝

Thank you for your interest in contributing to NaiCover! This document provides comprehensive guidelines for contributing to this project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style and Standards](#code-style-and-standards)
- [Component Guidelines](#component-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Project Structure](#project-structure)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn package manager
- Git
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Initial Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/NaiCoverFrontend.git
   cd NaiCoverFrontend
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/moturiphil/NaiCoverFrontend.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/feature-name` - Feature development
- `bugfix/bug-description` - Bug fixes
- `hotfix/critical-fix` - Critical production fixes

### Working on a Feature

1. **Create a feature branch**
   ```bash
   git checkout main
   git pull upstream main
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the coding standards
   - Write meaningful commit messages
   - Test your changes thoroughly

3. **Keep your branch updated**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## Code Style and Standards

### TypeScript Guidelines

- **Use TypeScript for all new components**
- Define interfaces for props and complex data structures
- Avoid `any` types - use proper typing
- Use meaningful variable and function names

```typescript
// ✅ Good
interface UserProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  onUpdate: (user: User) => void;
}

// ❌ Bad
interface Props {
  data: any;
  callback: (x: any) => void;
}
```

### React Component Guidelines

- **Use functional components with hooks**
- Follow the component structure:
  ```typescript
  import { useState, useEffect } from 'react';
  import { SomeInterface } from '@/types';

  interface ComponentProps {
    // Props definition
  }

  export const ComponentName = ({ prop1, prop2 }: ComponentProps) => {
    // Hooks
    const [state, setState] = useState();

    // Effects
    useEffect(() => {
      // Side effects
    }, []);

    // Event handlers
    const handleClick = () => {
      // Handler logic
    };

    // Render
    return (
      <div>
        {/* Component JSX */}
      </div>
    );
  };
  ```

### Styling Guidelines

- **Use Tailwind CSS classes** for styling
- Follow mobile-first responsive design
- Use semantic color names from the theme
- Prefer utility classes over custom CSS when possible

```typescript
// ✅ Good
<div className="bg-primary text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
  Content
</div>

// ❌ Bad
<div className="bg-blue-500 text-white" style={{ padding: '16px' }}>
  Content
</div>
```

### File Naming Conventions

- **Components**: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- **Hooks**: `camelCase.ts` with `use` prefix (e.g., `useLocalStorage.ts`)
- **Utilities**: `camelCase.ts` (e.g., `formatCurrency.ts`)
- **Types**: `camelCase.ts` (e.g., `userTypes.ts`)
- **Constants**: `UPPER_SNAKE_CASE.ts` (e.g., `API_ENDPOINTS.ts`)

## Component Guidelines

### Component Organization

```
src/components/
├── ui/              # Reusable UI components
├── forms/           # Form-related components
├── layout/          # Layout components
├── feature/         # Feature-specific components
└── shared/          # Shared business components
```

### Creating New Components

1. **Create component file**
   ```typescript
   // src/components/ui/Button.tsx
   import { ButtonHTMLAttributes, forwardRef } from 'react';
   import { cn } from '@/lib/utils';

   interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
     variant?: 'primary' | 'secondary' | 'outline';
     size?: 'sm' | 'md' | 'lg';
   }

   export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
     ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
       return (
         <button
           ref={ref}
           className={cn(
             'inline-flex items-center justify-center rounded-md font-medium transition-colors',
             {
               'bg-primary text-white hover:bg-primary/90': variant === 'primary',
               'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
               'border border-input bg-background hover:bg-accent': variant === 'outline',
             },
             {
               'h-8 px-3 text-sm': size === 'sm',
               'h-10 px-4': size === 'md',
               'h-12 px-6 text-lg': size === 'lg',
             },
             className
           )}
           {...props}
         />
       );
     }
   );

   Button.displayName = 'Button';
   ```

2. **Export from index file**
   ```typescript
   // src/components/ui/index.ts
   export { Button } from './Button';
   ```

### Using shadcn/ui Components

When adding new shadcn/ui components:

```bash
npx shadcn@latest add button
```

## Testing Guidelines

### Manual Testing Checklist

Before submitting a PR, ensure:

- [ ] Component renders correctly in different screen sizes
- [ ] All interactive elements work as expected
- [ ] Form validation works properly
- [ ] No console errors or warnings
- [ ] Accessibility features work (keyboard navigation, screen readers)
- [ ] Performance is acceptable (no unnecessary re-renders)

### Browser Testing

Test your changes in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Commit Message Guidelines

Follow conventional commits format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

### Examples

```bash
git commit -m "feat(auth): add user login functionality"
git commit -m "fix(ui): resolve button hover state issue"
git commit -m "docs: update setup instructions in README"
git commit -m "style(components): format code with prettier"
```

## Pull Request Process

### PR Checklist

- [ ] Branch is up to date with main
- [ ] Code follows project standards
- [ ] All manual tests pass
- [ ] No linting errors (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] PR description clearly explains changes
- [ ] Screenshots included for UI changes

### PR Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Other (please describe)

## Testing
- [ ] Manual testing completed
- [ ] Cross-browser testing completed
- [ ] Mobile responsiveness verified

## Screenshots (if applicable)
[Include screenshots of UI changes]

## Related Issues
Closes #[issue-number]
```

### Review Process

1. **Automated checks** must pass
2. **Code review** by at least one maintainer
3. **Manual testing** by reviewer
4. **Approval** and merge by maintainer

## Issue Reporting

### Bug Reports

Use the bug report template:

```markdown
**Bug Description**
A clear description of the bug.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]
- Device: [e.g. iPhone6]

**Additional Context**
Any other context about the problem.
```

### Feature Requests

Use the feature request template:

```markdown
**Feature Description**
A clear description of the requested feature.

**Problem Statement**
What problem does this solve?

**Proposed Solution**
Describe your preferred solution.

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Any other context or screenshots.
```

## Project Structure

```
NaiCoverFrontend/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # Reusable UI components
│   │   ├── forms/      # Form components
│   │   └── ...         # Feature components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── data/           # Static data and mock data
│   ├── assets/         # Images, fonts, etc.
│   └── app/            # Application pages
├── docs/               # Documentation
├── .github/            # GitHub templates and workflows
├── README.md           # Project overview
├── CONTRIBUTING.md     # This file
├── SETUP.md           # Detailed setup instructions
└── DEPLOYMENT.md      # Deployment guidelines
```

## Getting Help

- **Discord**: [Join our Discord server](#)
- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and community discussions
- **Email**: [maintainer-email@domain.com](#)

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

---

Thank you for contributing to NaiCover! Your efforts help make insurance more accessible to everyone. 🛡️