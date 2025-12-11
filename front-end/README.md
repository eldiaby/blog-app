# 📁 Project Structure Documentation

This document explains the folder structure of the project and the purpose of each directory.
It is designed to help any developer quickly understand and work with the codebase.

---

## 📦 **Folder Structure**
```
.
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── store/
│   ├── styles/
│   ├── test/
│   ├── utils/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
├── tests/
│   └── setupTests.ts
├── .gitignore
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

# 📚 **Folders Explanation**

## **public/**
Contains static assets that are served directly without being processed by Vite.
Examples:

-Global images
- favicon
- manifest

---

## **src/**
Main source folder containing all application logic.

### **1. assets/**
Holds static files imported in the project:

- Images
- SVG icons
- Fonts
- Other static media

---

### **2. components/**
Reusable UI components shared across the application.
Examples:

- Buttons
- Inputs
- Modals
- Tables

---

### **3. hooks/**
Custom React hooks used to encapsulate logic.
Examples:

- useAuth
- useFetch
- useDebounce

---

### **4. layouts/**
Page layout components that define the structural layout of views.
Examples:

- Dashboard Layout
- Auth Layout

---

### **5. pages/**
All application pages. Each file/folder represents a screen.
Examples:

- Login
- Dashboard
- Cases
- Clients
- Settings

---

### **6. routes/**
Contains route definitions and routing logic.
Examples:

- Public Routes
- Private Routes
- Route Guards

---

### **7. services/**
API handling and business logic.
Includes:

- API Client (Axios / Fetch)
- Auth Service
- User Service
- Cases Service

---

### **8. store/**
State management layer (Zustand, Redux, or any state library).
Each store module is placed in its own file.

- Zustand  
- Redux  
- Jotai  

---

### **9. styles/**
Global styling:

- Variables
- Global Styles
- Theme
- Reset

---

### **10. test/**
Feature-specific unit tests.

---

### **11. utils/**
Utility functions and helpers:

- Formatters
- Validators  
- Helper Functions  
- Constants

---

## **App.tsx / main.tsx / index.css**
Core application entry points and global styling.

---

## **tests/setupTests.ts**
Global Jest / Testing Library setup:

- Mocking  
- Global Test Setup  

---

## **Config Files**
### **vite.config.ts**
Vite configuration for build and development.

### **tsconfig.json**
TypeScript compiler settings.

### **package.json**
Project dependencies and available scripts.

---

