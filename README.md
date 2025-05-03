# Department Management API

A NestJS GraphQL API for managing departments and sub-departments with validation for unique department names.

## ✅ Features

- Create departments and sub-departments
- Validate uniqueness
- Nested querying of sub-departments
- Update and delete operations
- Login authentication

---

## 🔐 Login Credentials

Use the following credentials to log in:

- **Username:** `admin`
- **Password:** `admin123`

---

## 🧪 GraphQL Playground

- **Local Playground:** [http://localhost:3000/graphql](http://localhost:3000/graphql)
- **Deployed URL:**, `https://dms-backend-vcy3.onrender.com/graphql`

---

## 🎯 Frontend URL

You can use the frontend client to interact with this API:

- **Frontend URL:** https://dms-frontend-roan.vercel.app

---

## 📁 Mutation File

## All mutation examples are provided in the `mutation.graphql` file located in the project root

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/dabdu/dms-backend.git
cd dms-backend
```

### 2. Install Dependencies

```bash
npm install
npm run build
```

### 3. Create Environment File

Add a `.env` file with:

```env
DATABASE_URL=postgresql://dmsdb_owner:npg_REi50dKwDqax@ep-tight-forest-a4yix1bh-pooler.us-east-1.aws.neon.tech/dmsdb?sslmode=require
JWT_SECRET=supersecret
JWT_EXPIRES_IN=7d
```

### 4. Run the App

```bash
npm run start:dev
```
