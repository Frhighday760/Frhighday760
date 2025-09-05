# Frhighday - Cannabis Community Platform

## Overview

Frhighday is a cross-platform cannabis community application built as a Progressive Web App (PWA) with native mobile support through Capacitor. The platform enables users to share posts, write strain reviews, and connect with fellow cannabis enthusiasts. The application is designed to work seamlessly across web browsers, iOS, and Android devices with a focus on mobile-first user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React-based Single Page Application**: Built with React and TypeScript, providing a modern, component-based architecture for the user interface
- **Progressive Web App (PWA)**: Implements service worker for offline functionality, caching strategies, and native app-like experience
- **Mobile-First Design**: Responsive design with specific mobile optimizations including viewport configuration, touch gestures, and iOS-specific styling
- **Build System**: Uses Vite for fast development and optimized production builds with automatic code splitting

### Cross-Platform Strategy
- **Capacitor Integration**: Wraps the web application for native iOS and Android deployment while maintaining a single codebase
- **Native Plugin Support**: Configured for camera access, filesystem operations, local notifications, preferences storage, and push notifications
- **Platform-Specific Configurations**: Separate build configurations for web, iOS, and Android with platform-optimized assets and settings

### PWA Features
- **Service Worker**: Implements caching strategies for offline functionality and improved performance
- **Web App Manifest**: Configured for installation on mobile devices with proper icons, theme colors, and display modes
- **Emergency Fallback**: Dedicated emergency.html page for critical system failures or maintenance scenarios

### Development and Deployment
- **Unified Asset Management**: Shared public assets across web and mobile platforms with automatic synchronization
- **Security Configuration**: Includes Semgrep rules for security scanning and best practices enforcement
- **Multi-Platform Build**: Single source code deployed to web servers and packaged for mobile app stores

### Performance Optimizations
- **Critical CSS Inlining**: Essential styles loaded immediately to prevent layout shifts
- **Font Size Consistency**: Prevents unwanted zoom on mobile devices with standardized input field sizing
- **Viewport Handling**: Proper mobile viewport configuration with support for dynamic viewport heights

## External Dependencies

### Mobile Platform Services
- **Capacitor Framework**: Core framework for cross-platform mobile development
- **iOS and Android SDKs**: Native platform integration for app store deployment

### PWA Technologies
- **Service Worker API**: Browser caching and offline functionality
- **Web App Manifest**: Progressive web app installation and configuration

### Development Tools
- **Semgrep**: Static analysis security scanning for code quality and vulnerability detection
- **Vite Build System**: Modern frontend build tool for development and production optimization

### Potential Database Integration
- **Database Preparation**: Architecture supports future integration with relational databases for user data, posts, and strain information storage