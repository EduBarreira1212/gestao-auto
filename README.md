# **Gestão Auto**

A **B2B SaaS** for managing vehicles, tracking expenses, and storing related user data.
The system allows authenticated users to register cars, log expenses, and view all recorded transactions in an intuitive interface.

The project includes a **React + TypeScript** front-end, a **Node.js** back-end, and a **PostgreSQL** database running in **Docker**. Authentication is powered by **Clerk**.

---

## **Table of Contents**

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Running the Project](#running-the-project)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)

---

## **Features**

- 🔐 **Authentication** with Clerk (sign up, login, secure sessions).
- 🚗 **Car Management** — register, update, and delete vehicles.
- 💰 **Expense Tracking** — add, list, and manage expenses linked to vehicles.
- 📊 **Expense Overview** — list of all user expenses with filtering options.
- 📦 **Dockerized Database** — PostgreSQL in a container for easy setup.
- ⚡ **Optimized UI** — fast navigation using **React Query** for caching.
- 🧪 **Automated Testing** with Jest, React Testing Library, Cypress, and Supertest.

---

## **Tech Stack**

**Frontend:**

- React + TypeScript
- Tailwind CSS
- React Query
- Clerk (authentication)

**Backend:**

- Node.js + TypeScript
- Express.js
- Prisma ORM
- PostgreSQL (Docker)
- ESLint + Prettier
- AWS S3 (file storage integration)

**Testing:**

- Jest
- React Testing Library
- Cypress (E2E)
- Supertest

**DevOps & Tools:**

- Docker
- ESLint + Prettier for linting & formatting
- GitHub Actions for CI/CD

---

## **Folder Structure**

```
root/
│── web/                     # Frontend (React + Vite + Tailwind)
│   ├── node_modules/        # Frontend dependencies
│   ├── public/              # Static assets (favicon, images, etc.)
│   ├── src/                 # Frontend source code
│   ├── .env.local           # Environment variables for frontend
│   ├── .gitignore           # Git ignore rules (frontend)
│   ├── .prettierrc.json     # Prettier config
│   ├── .vercelignore        # Ignore files during Vercel deploy
│   ├── eslint.config.js     # ESLint rules for linting frontend
│   ├── index.html           # Root HTML template
│   ├── package.json         # Frontend dependencies & scripts
│   ├── package-lock.json    # Lockfile for dependencies
│   ├── postcss.config.js    # PostCSS setup for Tailwind
│   ├── tailwind.config.js   # TailwindCSS configuration
│   ├── tsconfig.json        # TypeScript config
│   ├── tsconfig.app.json    # App-specific TS config
│   ├── tsconfig.node.json   # Node-specific TS config
│   ├── vercel.json          # Vercel deployment configuration
│   ├── vite.config.ts       # Vite build configuration
│   └── README.md            # Documentation (this file)
│
│── server/                  # Backend (Node.js + Express + Prisma + PostgreSQL)
│   ├── .postgres-data/      # Local database volume (ignored in Git)
│   ├── aws-S3/              # AWS S3 integration logic
│   ├── clerk/               # Clerk authentication setup
│   ├── coverage/            # Test coverage reports
│   ├── docs/                # Backend documentation
│   ├── node_modules/        # Backend dependencies
│   ├── prisma/              # Prisma schema & migrations
│   ├── src/                 # Backend source code
│   ├── .env                 # Backend environment variables
│   ├── .env.test            # Environment variables for testing
│   ├── .gitignore           # Git ignore rules (backend)
│   ├── .prettierrc.json     # Prettier config
│   ├── docker-compose.yml   # Docker config for DB & services
│   ├── eslint.config.mjs    # ESLint rules for backend
│   ├── jest.config.mjs      # Jest testing configuration
│   ├── jest.global-setup.js # Global setup for Jest
│   ├── jest.setup-after-env.js # Setup after Jest environment loads
│   ├── package.json         # Backend dependencies & scripts
│   ├── package-lock.json    # Lockfile for dependencies
│
│── .gitignore               # Global gitignore rules
│── README.md                # Project documentation

```

---

## **Installation**

### **1. Clone the repository**

```bash
git clone https://github.com/your-username/gestao-auto.git
cd gestao-auto
```

### **2. Install dependencies**

Install **backend** dependencies:

```bash
cd server
npm install
```

Install **frontend** dependencies:

```bash
cd ../web
npm install
```

---

## **Environment Variables**

### **Backend (.env)**

```
PORT=
FRONTEND_URL=
DATABASE_URL=
LOCAL_DATABASE=
EXTERNAL_DB_URL=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
WEBHOOK_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=
```

### **Frontend (.env)**

```
VITE_API_URL=
VITE_CLERK_API_KEY=
VITE_STRIPE_PUBLIC_KEY=
VITE_MONTH_STRIPE_PRICE_ID=
VITE_ANNUAL_STRIPE_PRICE_ID=
```

For testing, create a `.env.test` file with test-specific variables.

---

## **Database**

The database runs in **Docker** without volumes for tests.

### **Start database container**

```bash
docker compose up -d
```

### **Run migrations**

```bash
cd server
yarn prisma migrate dev
```

---

## **Running the Project**

### **Backend**

```bash
cd server
yarn dev
```

### **Frontend**

```bash
cd web
yarn dev
```

---

## **Testing**

### **Run backend tests**

```bash
cd server
yarn test
```

### **Run frontend tests**

```bash
cd web
yarn test
```

### **E2E tests with Cypress**

```bash
cd web
yarn cypress open
```

---

## **Deployment**

- **Frontend:** Vercel (output folder: `dist`).
- **Backend:** Render / Railway.
- **Database:** Amazon RDS / Render / Railway (PostgreSQL).

---

## **License**

This project is licensed under the [MIT License](LICENSE).
