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

## **Architecture**

The project follows a **monorepo** pattern:

```
root/
 ├── server/         # Backend API
 │   ├── prisma/     # Prisma schema & migrations
 │   ├── src/        # Backend code
 │   └── tests/      # Backend tests
 ├── web/            # Frontend React app
 │   ├── src/        # React components, hooks, and pages
 │   └── tests/      # Frontend tests
 ├── docker/         # Docker setup for PostgreSQL
 └── .github/        # CI/CD workflows (inside server folder)
```

---

## **Folder Structure**

```
web/
  src/
    components/
    hooks/
    pages/
    services/
    utils/

server/
  src/
    routes/
    controllers/
    services/
    middlewares/
    prisma/
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
yarn install
```

Install **frontend** dependencies:

```bash
cd ../web
yarn install
```

---

## **Environment Variables**

### **Backend (.env)**

```
DATABASE_URL=postgresql://user:password@localhost:5432/gestaoauto
CLERK_SECRET_KEY=your-clerk-secret-key
PORT=4000
```

### **Frontend (.env)**

```
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
VITE_API_URL=http://localhost:4000
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
