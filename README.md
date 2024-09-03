## WIS-BACKEND-API 

**Overview**

This project is a backend for a wedding invitation application. This backend is built using Node.js with the Express.js framework and uses a PostgreSQL database to store data.

**Framework & Library :**

```├──
├── @types/express@4.17.21
├── @types/morgan@1.9.9
├── @types/node@22.5.2
├── dotenv@16.4.5
├── express-validator@7.2.0
├── express@4.19.2
├── morgan@1.10.0
├── prisma@5.19.1
├── ts-node@10.9.2
└── typescript@5.5.4
```

### Requirements

Before you begin, make sure you have the following software installed on your system:

* Node.js (version 14 or later)
* PostgreSQL (version 12 or later)
* NPM or Yarn

### Installation

Clone Repository :

```bash
git clone https://github.com/indraoverflow/backend-wis-mulai-hidup.git
cd wedding-invitation-backend
```

Install Dependencies

Install all required dependencies by running the following command:

```bash
npm install
```

    *using yarn*

```bash
yarn install
```

Environment Variables

Create a .env file in the root of the project directory and add the following environment variables:

```bash
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/wedding_invitation
JWT_SECRET=your_jwt_secret_key
```

Migration Database

This project uses prism for database management. Do the migration by entering the command into the terminal:

```bash
npx prisma migrate dev --name push_db
```

Running the Server :

    Production :

```bash
npm run build && npm run start
```

    Development :

```bash
npm run dev
```

# POSTMAN (ONPROGRESS)

---
