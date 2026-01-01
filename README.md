# Inkle - Customer Management System

A modern, responsive customer management application built with Next.js, featuring a powerful data table with search, filtering, sorting, and pagination capabilities.

## 🚀 Features

### Core Functionality
- **Data Table**: Interactive table built with `@tanstack/react-table`
- **Search**: Global search across all columns (Entity, Gender, Country, Date)
- **Sorting**: Click-to-sort on Entity, Gender, and Request Date columns
- **Filtering**: Country-based filtering with multi-select dropdown
- **Pagination**: Full pagination controls with customizable page sizes (5, 10, 20, 30, 50)
- **Edit Modal**: Edit customer details (Name and Country) with validation
- **Responsive Design**: Fully responsive across all device sizes (mobile, tablet, desktop)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Inkle
```

2. Navigate to the frontend directory:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.js          # Root layout with Header and Footer
│   │   ├── page.js            # Home page (redirects to table)
│   │   ├── table/
│   │   │   └── page.js        # Main table page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── Header.jsx         # Navigation header with mobile menu
│   │   ├── Footer.jsx         # Footer component
│   │   └── table/
│   │       ├── SearchBar.jsx      # Search input component
│   │       ├── DataTable.jsx      # Main table component
│   │       ├── CountryFilter.jsx  # Country filter dropdown
│   │       ├── TablePagination.jsx # Pagination controls
│   │       ├── EditModal.jsx      # Edit customer modal
│   │       └── tableColumns.js    # Column definitions
│   └── services/
│       └── api.js            # API service functions
└── package.json
```

## 🔧 Technology Stack

- **Framework**: Next.js 16.1.1
- **React**: 19.2.3
- **Table Library**: @tanstack/react-table 8.21.3
- **HTTP Client**: Axios 1.13.2
- **Icons**: Lucide React 0.562.0
- **Styling**: Tailwind CSS 4
- **Language**: JavaScript

## 📡 API Endpoints

The application uses the following mock API endpoints:

- **Get Taxes**: `GET https://685013d7e7c42cfd17974a33.mockapi.io/taxes`
- **Update Tax**: `PUT https://685013d7e7c42cfd17974a33.mockapi.io/taxes/:id`
- **Get Countries**: `GET https://685013d7e7c42cfd17974a33.mockapi.io/countries`

## 🎨 Key Components

### Table Components

1. **SearchBar**: Global search input with clear functionality
2. **DataTable**: Main table rendering with responsive design
3. **CountryFilter**: Multi-select country filter with badge indicator
4. **TablePagination**: Navigation controls and page size selector
5. **EditModal**: Modal for editing customer name and country
6. **tableColumns**: Column definitions with sorting and formatting logic

### Layout Components

1. **Header**: Responsive navigation with mobile hamburger menu
2. **Footer**: Footer with links and social media icons

## 🔑 Key Features Explained

### Search
- Real-time search across all columns
- Case-insensitive matching
- Clear button when search is active

### Sorting
- Click column headers to sort
- Visual indicators (arrows) show sort direction
- Supports ascending and descending order

### Filtering
- Country-based filtering
- Multi-select checkboxes
- Shows count badge when filters are active
- Clear all functionality

### Pagination
- First, Previous, Next, Last buttons
- Page indicator (e.g., "Page 1 of 5")
- Page size selector
- Results counter with filtered vs total count

### Edit Modal
- Edit customer name (required field)
- Country dropdown with search
- Form validation
- Preserves existing data on update
- Blurred backdrop effect

## 🎨 Styling

The application uses Tailwind CSS with a purple color scheme:
- Primary: Purple (#9333ea, #7c3aed)
- Accent colors for gender badges (Red for Male, Blue for Female)
- Responsive breakpoints: sm, md, lg

## 📱 Responsive Design

- **Mobile**: Stacked layout, hamburger menu, horizontal table scroll
- **Tablet**: Optimized spacing and layout
- **Desktop**: Full-width table with all features visible


