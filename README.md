# Gallaery Management 

## 🌐 Project Link  => https://gallary-management.vercel.app

A modern web application built with Next.js for managing images, categories, and annotations. This project provides a comprehensive solution for organizing and annotating images with a user-friendly interface.

## 📋 Project Description

Averroes is a full-stack web application that allows users to:

- **Manage Gallery**: Upload, view, edit, and delete images with filtering capabilities
- **Manage Categories**: Create and organize image categories
- **Manage Annotations**: Add annotations to images using an interactive canvas interface

The application features a modern, responsive UI built with Material-UI and includes features like image filtering, category management, and interactive annotation tools.

## ✨ Features

- 🖼️ **Image Gallery Management**: Browse, upload, edit, and delete images
- 🏷️ **Category Management**: Organize images into categories
- ✏️ **Image Annotations**: Add and edit annotations on images using Konva canvas
- 🔍 **Filtering**: Filter images by category
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast Performance**: Optimized with React Query for efficient data fetching
- 🎨 **Modern UI**: Built with Material-UI components

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.10 (App Router)
- **UI Library**: React 19.2.1
- **Styling**: Material-UI (MUI) v7
- **State Management**: TanStack React Query
- **Form Management**: Formik with Yup validation
- **Canvas/Annotations**: Konva & React-Konva
- **HTTP Client**: Axios
- **Animations**: Lottie React
- **Package Manager**: pnpm
- **Language**: TypeScript

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **pnpm** (v8 or higher)

If you don't have pnpm installed, you can install it globally using:

```bash
npm install -g pnpm
```

## 🚀 Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd averroes-technical-test
```

2. **Install dependencies**

```bash
pnpm install
```

This will install all required dependencies including Next.js, React, Material-UI, and other packages.

## ▶️ Running the Application

### Development Mode

To start the development server:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

The page will automatically reload when you make changes to the code.

### Production Build

To create an optimized production build:

```bash
pnpm build
```

To start the production server:

```bash
pnpm start
```

### Linting

To run ESLint:

```bash
pnpm lint

```
## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
