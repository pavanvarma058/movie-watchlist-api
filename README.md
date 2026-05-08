# Movie WatchList API

Movie WatchList API is a backend REST API built with Node.js, Express.js, PostgreSQL, Neon, and Prisma.  
It allows users to register, login, manage movies, and create a personal movie watchlist.

## Features

- User registration and login
- Authentication middleware
- Add movies
- View movies
- Manage user watchlist
- Add movies to watchlist
- View watchlist
- Remove movies from watchlist
- Request validation middleware
- PostgreSQL database with Neon
- Prisma ORM for database operations
- Clean folder structure using routes, controllers, middleware, and validators

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Neon Database
- Prisma ORM
- JavaScript
- Postman

## Project Structure

```bash
Movie-WatchList-API/
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── watchListController.js
│   │
│   ├── middleware/
│   │   ├── theAuthMiddleware.js
│   │   └── validateRequest.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── movieRoutes.js
│   │   └── watchListRoutes.js
│   │
│   ├── utils/
│   │
│   ├── validators/
│   │   └── watchListValidators.js
│   │
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── prisma.config.ts
└── README.md
