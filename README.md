# Technical Stack Documentation - allinone Project

## Project Overview
The **allinone** project is a modern web application built with Next.js, React, and a comprehensive UI component library. It's designed as a full-stack web application with TypeScript support and Tailwind CSS styling.

---

## 🏗️ Core Framework & Runtime

### Framework
- **Next.js** (v16.1.6) - React metaframework for production
  - Server-side rendering and static generation
  - API routes for backend functionality
  - Built-in image optimization
  - Built-in fast refresh for development

### JavaScript Runtime & Build
- **Node.js** - JavaScript runtime
- **pnpm** - Package manager (lock file: pnpm-lock.yaml)
- **TypeScript** (v5.7.3) - Typed JavaScript for better code quality

### Runtime Compiler
- **Turbo** - Build system optimization (used in dev script: `next dev --turbo`)

---

## 📦 Core Dependencies

### Frontend Framework & UI
- **React** (v19.2.3) - UI library for building components
- **React DOM** (v19.2.3) - React rendering for web
- **Next.js** (v16.1.6) - React framework with SSR/SSG

### UI Component Library - Radix UI
Comprehensive set of low-level UI components built on React:
- `@radix-ui/react-accordion` (v1.2.2)
- `@radix-ui/react-alert-dialog` (v1.1.4)
- `@radix-ui/react-aspect-ratio` (v1.1.1)
- `@radix-ui/react-avatar` (v1.1.2)
- `@radix-ui/react-checkbox` (v1.1.3)
- `@radix-ui/react-collapsible` (v1.1.2)
- `@radix-ui/react-context-menu` (v2.2.4)
- `@radix-ui/react-dialog` (v1.1.4)
- `@radix-ui/react-dropdown-menu` (v2.1.4)
- `@radix-ui/react-hover-card` (v1.1.4)
- `@radix-ui/react-label` (v2.1.1)
- `@radix-ui/react-menubar` (v1.1.4)
- `@radix-ui/react-navigation-menu` (v1.2.3)
- `@radix-ui/react-popover` (v1.1.4)
- `@radix-ui/react-progress` (v1.1.1)
- `@radix-ui/react-radio-group` (v1.2.2)
- `@radix-ui/react-scroll-area` (v1.2.2)
- `@radix-ui/react-select` (v2.1.4)
- `@radix-ui/react-separator` (v1.1.1)
- `@radix-ui/react-slider` (v1.2.2)
- `@radix-ui/react-slot` (v1.1.1)
- `@radix-ui/react-switch` (v1.1.2)
- `@radix-ui/react-tabs` (v1.1.2)
- `@radix-ui/react-toast` (v1.2.4)
- `@radix-ui/react-toggle` (v1.1.1)
- `@radix-ui/react-toggle-group` (v1.1.1)
- `@radix-ui/react-tooltip` (v1.1.6)

### UI Utilities & Styling
- **Tailwind CSS** (v3.4.17) - Utility-first CSS framework
- **Tailwind Merge** (v2.5.5) - Resolves conflicting Tailwind classes
- **PostCSS** (v8.5) - CSS transformation tool
- **Autoprefixer** (v10.4.20) - Adds vendor prefixes to CSS
- **Class Variance Authority** (v0.7.1) - CSS variant composition
- **clsx** (v2.1.1) - Utility for constructing class names
- **tailwindcss-animate** (v1.0.7) - Animation utilities for Tailwind

### Form Management
- **React Hook Form** (v7.54.1) - Performant form handling
- **@hookform/resolvers** (v3.9.1) - Validation resolvers for Hook Form
- **Zod** (v3.24.1) - TypeScript-first schema validation

### Data Visualization
- **Recharts** (v2.15.0) - React charts library with composable components

### Date & Time
- **date-fns** (v3.0.0) - Modern date utility library
- **React Day Picker** (v8.10.1) - Date picker component built on React

### UI Components & Icons
- **Lucide React** (v0.544.0) - Icon library with React components
- **cmdk** (v1.1.1) - Command menu component
- **Sonner** (v1.7.1) - Toast notification component
- **Embla Carousel React** (v8.5.1) - Carousel/slider component
- **React Resizable Panels** (v2.1.7) - Resizable panel component
- **input-otp** (v1.4.1) - OTP input component
- **Vaul** (v1.1.2) - Drawer component

### Theming
- **next-themes** (v0.4.6) - Dark mode and theme management

### Component Configuration
- **shadcn/ui** - Preconfigured UI components (configured in components.json)

---

## 🛠️ Development Dependencies

### TypeScript & Type Definitions
- **typescript** (v5.7.3) - Strict typing for JavaScript
- **@types/node** (v22) - Node.js type definitions
- **@types/react** (v19.2.7) - React type definitions
- **@types/react-dom** (v19.2.3) - React DOM type definitions

### CSS Processing
- **@tailwindcss/postcss** (v4.1.13) - Next-generation PostCSS plugin for Tailwind

---

## 📂 Project Structure

Based on the repository configuration, the project follows this structure:

```
allinone/
├── app/                      # Next.js app directory
├── components/               # React components directory
│   └── ui/                  # UI component library (from components.json)
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions (utils.ts in @/lib/utils path)
├── styles/                  # Global styles
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── next.config.mjs          # Next.js configuration
├── postcss.config.mjs       # PostCSS configuration
├── components.json          # shadcn/ui configuration
└── next-env.d.ts            # Next.js environment types
```

---

## 🔧 Build & Development Scripts

### Available Scripts
```json
{
  "dev": "next dev --turbo",   // Development server with Turbo
  "build": "next build",       // Production build
  "start": "next start",       // Start production server
  "lint": "next lint"          // Lint with Next.js linter
}
```

---

## ⚙️ Configuration Files

### TypeScript Configuration (tsconfig.json)
- **Target**: ES6
- **Module**: ESNext
- **JSX**: React 19 with automatic JSX transform
- **Strict Mode**: Enabled
- **Module Resolution**: Bundler
- **Alias Path**: `@/*` maps to root directory
- **Incremental Compilation**: Enabled for faster rebuilds

### Tailwind CSS Configuration (tailwind.config.ts)
- Supports CSS variables for theming
- Integrates with Radix UI components
- Custom base color: Neutral
- Plugin: tailwindcss-animate

### Next.js Configuration (next.config.mjs)
- Configured for TypeScript support
- Ready for API routes
- Image optimization enabled

### PostCSS Configuration (postcss.config.mjs)
- Tailwind CSS plugin
- Autoprefixer for cross-browser compatibility

### shadcn/ui Configuration (components.json)
- Style: Default
- RSC: Enabled (React Server Components)
- TSX: Enabled (TypeScript JSX files)
- CSS Location: `app/globals.css`
- Component Aliases:
  - `@/components` - UI components
  - `@/lib/utils` - Utility functions
  - `@/components/ui` - Base UI components
  - `@/lib` - Library utilities
  - `@/hooks` - Custom hooks
- Icon Library: Lucide

---

## 📋 Package Manager Configuration

### pnpm
The project uses **pnpm** as the package manager with the following overrides:
```json
{
  "@types/react": "19.2.7",
  "@types/react-dom": "19.2.3"
}
```

This ensures consistent type versions across dependencies.

---

## 🎯 Key Features & Capabilities

### 1. Modern React Development
- React 19 with concurrent rendering
- React Hook Form for efficient form handling
- Server Components ready

### 2. Comprehensive UI Component System
- 30+ Radix UI primitive components
- Pre-built shadcn/ui components with customization
- Accessible components by default

### 3. Styling & Theming
- Tailwind CSS v3 with CSS variables
- Dark mode support via next-themes
- Animation utilities

### 4. Type Safety
- Full TypeScript support with strict mode
- Type definitions for all dependencies
- Path aliasing for clean imports

### 5. Form Validation
- React Hook Form for state management
- Zod for schema validation
- Automatic resolver integration

### 6. Data Visualization
- Recharts for interactive charts
- Built-in theming support

### 7. Developer Experience
- Next.js 16 with Turbo for fast dev builds
- Hot Module Replacement (HMR)
- Linting with Next.js linter

---

## 🚀 Development Workflow

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm run dev
```
Starts development server at `http://localhost:3000` with Turbo optimization.

### Build for Production
```bash
pnpm run build
pnpm run start
```

### Code Quality
```bash
pnpm run lint
```

---

## 📊 Technology Stack Summary

| Category | Technologies |
|----------|--------------|
| **Runtime** | Node.js, JavaScript, TypeScript 5.7.3 |
| **Framework** | Next.js 16.1.6, React 19.2.3 |
| **Build** | pnpm, Turbo, webpack (via Next.js) |
| **Styling** | Tailwind CSS 3.4.17, PostCSS 8.5 |
| **UI Components** | Radix UI, shadcn/ui, Lucide Icons |
| **Forms** | React Hook Form 7.54.1, Zod 3.24.1 |
| **State Management** | React Context (via Radix UI) |
| **Data Viz** | Recharts 2.15.0 |
| **Theming** | next-themes 0.4.6, CSS Variables |
| **Date Handling** | date-fns 3.0.0, React Day Picker 8.10.1 |
| **Utilities** | clsx, tailwind-merge, class-variance-authority |
| **Type Checking** | TypeScript 5.7.3 |

---

## 🔐 Type Safety & Validation

- **TypeScript Strict Mode**: Enabled for compile-time type checking
- **Zod Schema Validation**: Runtime schema validation for forms and APIs
- **Type Definitions**: Complete type coverage for React and Node.js
- **JSX Configuration**: React 19 automatic JSX transform

---

## 🎨 Design System Integration

The project integrates with **shadcn/ui**, a collection of customizable component primitives built on Radix UI and Tailwind CSS. This enables:
- Consistent component API
- Customizable styling with Tailwind
- Accessibility by default (WCAG 2.1 AA)
- Copy-paste component approach for flexibility

---

## 📈 Performance Optimizations

1. **Turbo Build System**: Monorepo-aware build tool for faster incremental builds
2. **Next.js Image Optimization**: Automatic image optimization and serving
3. **React 19 Concurrent Features**: Better rendering performance
4. **CSS-in-JS Alternative**: Tailwind CSS utility classes for smaller bundle size
5. **Tree-shaking**: Module resolution configured for proper dead code elimination

---

## ✅ Quality Assurance

- **Linting**: Next.js built-in ESLint configuration
- **Type Checking**: TypeScript strict mode enabled
- **Module Resolution**: Configured for proper dependency resolution
- **Path Aliasing**: Clean import paths with `@/*` alias
