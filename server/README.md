# Airbnb - Backend

## Description

### Backend for airbnb project using Express.js, consists for various APIs that the frontend website can use to register, login, fetch all added places, Book new places and much more.

### `.env` file configuration

Rename `.env.example` file to `.env` and populate all fields with your values (for localsetup no need to provide FRONTEND_URL)

1. `DB_CONNECTION_STRING` - Create a mongodb database and put its connection string in to this filed <br>
2. `JWT_SECRET_TOKEN` - a secret token used while generating jwt tokens

### Installation

1. Clone the repository

```bash
git clone https://github.com/tpsravan99/airbnb.git
cd airbnb/server

```

2. Install dependencies

```bash
npm install
```

3. Run

```bash
npm run index.js
```

### now your backend service is up and running at `http://127.0.0.1:5000`

## Packages Used

1. CORS
2. cookie-parser
3. jsonwebtoken
4. multer
5. mongoose
