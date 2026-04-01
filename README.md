# Finio — Finance Dashboard

A clean, dark-themed finance dashboard built with React + Vite + Tailwind CSS.

## Tech Stack
- React 18 + Vite
- Tailwind CSS v3
- Recharts (charts)
- Lucide React (icons)
- useReducer + Context (state management)

## Setup
```bash
npm create vite@latest finance-dashboard -- --template react
cd finance-dashboard
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install recharts lucide-react
```

Replace generated config and src files with those in this project, then:
```bash
npm run dev
```

## Features
- **Dashboard**: Summary cards, area chart (6-month trend), pie chart (spending breakdown)
- **Transactions**: Search, filter by category/type, sort, paginated table
- **Admin Role**: Add, edit, delete transactions via modal
- **Viewer Role**: Read-only view
- **Insights**: Top spending category, savings rate, monthly bar comparison, category progress bars
- **Role switcher**: Dropdown in sidebar / mobile drawer
- **Responsive**: Sidebar on desktop, slide-in drawer on mobile

## Role Switching
Use the **Role** dropdown in the sidebar. Admin unlocks the Add/Edit/Delete controls on the Transactions page.