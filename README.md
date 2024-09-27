## WIS-BACKEND-API

**Overview**

This project is a backend for a wedding invitation application. This backend is built using Node.js with the Express.js framework and uses a PostgreSQL database to store data.

**Framework & Library :**

```bash
├── @prisma/client@5.19.1
├── @types/bcrypt@5.0.2
├── @types/cookie-parser@1.4.7
├── @types/express@4.17.21
├── @types/jsonwebtoken@9.0.6
├── @types/morgan@1.9.9
├── @types/node@22.5.2
├── @types/nodemailer@6.4.15
├── bcrypt@5.1.1
├── cookie-parser@1.4.6
├── cors@2.8.5
├── dotenv@16.4.5
├── express-validator@7.2.0
├── express@4.19.2
├── googleapis@143.0.0
├── jsonwebtoken@9.0.2
├── morgan@1.10.0
├── nodemailer@6.9.15
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

  Use yarn :

```bash
yarn install
```

Environment Variables

Create a .env file in the root of the project directory and add the following environment variables:

```bash
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/wedding_invitation
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
REDIRECT_URI=http://localhost:3000/auth/google/callback

# EMAIL SMTP CONFIG
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=daron.bartell@ethereal.email
SMTP_PASS=H4tDCB7PF3y4kvxa9s
```

Migration Database

This project uses prism for database management. Do the migration by entering the command into the terminal:

```bash
npx prisma migrate dev --name push_db
```

Seeding Database

```bash
npm run seed:role;npm run seed:user;npm run seed:theme;npm run seed:reception;npm run seed:ceremony;npm run seed:media;npm run seed:subscription
```

Running the Server :

    Production

```bash
npm run build && npm run start
```

    Development

```bash
npm run dev
```

# POSTMAN (ONPROGRESS)

API DOC : https://documenter.getpostman.com/view/18320873/2sAXjQ3W64#b22c1dac-439a-4f8a-b4f7-cb7483401213

---
