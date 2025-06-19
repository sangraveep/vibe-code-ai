# Vibe-code-AI

A modern React application built with Vite, featuring a beautiful purple theme and "Hello Universe" branding.

## Tech Stack

- **React 19** - Modern React with functional components and hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS v4** - Utility-first CSS framework with purple theme
- **ESLint** - Code linting and formatting

## Features

- ⚡ Lightning-fast development with Vite HMR
- 🎨 Beautiful purple-themed UI with Tailwind CSS
- 🌌 "Hello Universe" branding throughout
- 📱 Fully responsive design
- 🎯 Modern React best practices

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
src/
├── App.jsx          # Main application component
├── App.css          # Custom component styles
├── index.css        # Global styles with Tailwind
├── main.jsx         # Application entry point
└── assets/          # Static assets
```

## Development Guidelines

- Use functional components with hooks
- Follow React best practices
- Keep components modular and reusable
- Use descriptive component and variable names
- Leverage Tailwind CSS utilities for styling

## Available Plugins

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
