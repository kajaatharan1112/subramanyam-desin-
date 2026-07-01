# ONEVO Billing System - Project Documentation

## 1. Project Description
**ONEVO** is a modern billing and customer management system designed with a dual-role architecture, catering to both **Administrators** and **Customers**. 
- **Admin View:** Allows administrators to manage customers, view pending/completed bills, and configure settings.
- **Customer View:** Provides a portal for customers to track their active bills and view their dashboard.
The project emphasizes a highly polished, aesthetic user interface using a modern **Neumorphic (Glassmorphic)** design approach.

## 2. Project Following Rules & Architecture
- **Framework:** Built with **React** and **Vite** for fast development and optimized production builds.
- **Styling:** Uses **Tailwind CSS v4** as the primary styling engine. The project relies heavily on custom CSS variables (`index.css`) to maintain consistent theming.
- **Icons & Animations:** Uses `lucide-react` for crisp, scalable SVG icons and `framer-motion` for subtle, fluid micro-interactions (like button presses).
- **Role-Based Access:** The application dynamically switches navigation and views based on the active role (`admin` vs. `customer`).

## 3. UI Style and Design System
The project follows a **Neo-morphism** design aesthetic combined with soft gradients and glass effects:
- **Colors:** Utilizes a soft background (`#E9EEF5`) with vibrant primary accents (`#5A7BFF`) and gradients to make active elements pop.
- **Shadows:** The core of the neo-morphic look is achieved through custom shadow variables:
  - `--shadow-neo-soft`: Outward soft shadows for default elements.
  - `--shadow-neo-pressed`: Inset shadows for active/pressed states.
  - `--shadow-neo-floating`: Larger drop shadows for modals and overlays.
- **Corner Radius:** All primary interactive elements (Cards and Buttons) strictly follow a **15px** border radius (`--radius-neo-md`, `--radius-neo-lg`) to match Figma specifications precisely.
- **Typography:** Uses the `Inter` font family for clean, modern readability.

## 4. Components Style & Purpose

The `src/components` directory is organized modularly:

### UI & Buttons (`ui/`, `buttons/`)
- **`Card.jsx`:** The foundational container component. Supports `soft`, `inset`, and `floating` variants to create depth on the dashboard.
- **`PrimaryButton.jsx`:** A highly reusable button component. Features framer-motion animations on hover/tap. Supports variants like `primary`, `danger`, `ghost`, and `inset`.
- **`StatusBadge.jsx`:** A small indicator component used in lists to show the status of a bill or customer (e.g., active, pending).

### Navigation (`navigation/`)
- **`Sidebar.jsx`:** The main navigation drawer for desktop and tablet screens. It conditionally renders links based on the active role (Admin or Customer).
- **`TopBar.jsx`:** Provides quick actions (Search, Notifications, Profile) and a hamburger menu trigger for mobile devices.
- **`MobileBottomBar.jsx`:** A sticky bottom navigation bar specifically designed for mobile screens, ensuring easy thumb-reachability for core routes.

### Feedback (`feedback/`)
- **`Modal.jsx`:** A floating dialog window for critical interactions or confirmations, utilizing the `--shadow-neo-floating` style.
- **`Toast.jsx`:** Non-intrusive, slide-in notifications to provide system feedback to the user without interrupting their workflow.

### Feature Views (`feature/`)
- **`auth/LoginPage.jsx`:** The entry point of the app, featuring glassmorphism and background blur elements for a premium feel.
- **`dashboard/AdminDashboard.jsx`:** Shows high-level metrics (Pending Bills, Total Revenue) and quick actions for the admin.
- **`dashboard/CustomerDashboard.jsx`:** A simplified dashboard tailored for end-users to see their outstanding balances and recent activity.
- **`customers/CustomerList.jsx`:** A detailed data table displaying the customer roster, utilizing neo-morphic pills for search and filtering.

## 5. Data Flow & Display
- **Mock Data (`constants/mockData.js`):** Currently, the application relies on structured mock data to populate the dashboards, customer lists, and bills. 
- **State Management:** The main `App.jsx` controls the `currentView` and the active `role`, passing these down as props to the navigation and feature components.
- When an admin switches to the customer view, the navigation items (`routes.js`) update dynamically, and the UI immediately reflects the restricted data access intended for customers.
