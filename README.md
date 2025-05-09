Inventory Management System
A backend application for managing inventory items with role-based access control. Built with NestJS and Prisma.

Features
User authentication with JWT
Role-based access control (Admin and Customer roles)
Inventory item management (CRUD operations)
Input validation and error handling
PostgreSQL database with Prisma ORM
Architecture
Technology Stack
Backend Framework: NestJS
ORM: Prisma
Database: PostgreSQL
Authentication: JWT
Validation: Class Validator
Database Schema
The system uses two main entities:

User: Stores user credentials and role information
Item: Stores inventory item details
Getting Started
Prerequisites
Node.js (v16 or higher)
npm (v7 or higher)
PostgreSQL (or any database supported by Prisma)
Installation
Clone the repository
Install dependencies:
npm install
Configure your database connection in .env
Run migrations:
npx prisma migrate dev --name init
Seed the database:
npx prisma db seed
Start the server:
npm run start:dev
API Endpoints
Authentication
POST /auth/register - Register a new user
POST /auth/login - Login and get JWT token
Items
GET /items - Get all available items (public)
GET /items/all - Get all items (admin only)
GET /items/:id - Get item by ID
POST /items - Create new item (admin only)
PUT /items/:id - Update item (admin only)
DELETE /items/:id - Delete item (admin only)
Documentation
For detailed API documentation and setup instructions, please see:

API Documentation
Setup Guide
Project Structure
inventory-management-system/
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed data
├── src/
│   ├── auth/             # Authentication module
│   │   ├── dto/          # Data transfer objects
│   │   ├── guards/       # Authentication guards
│   │   └── decorators/   # Custom decorators
│   ├── items/            # Items module
│   │   ├── dto/          # Data transfer objects
│   │   ├── items.service.ts
│   │   └── items.controller.ts
│   ├── prisma/           # Prisma module
│   ├── app.module.ts     # Main application module
│   └── main.ts           # Application entry point
└── package.json
License
This project is licensed under the MIT License.

