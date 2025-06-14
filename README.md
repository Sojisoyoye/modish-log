# Modish-Log

A comprehensive inventory management system for retail businesses with product, sales, and stock tracking features.

## Overview

Modish-Log is a full-stack application built with:

- **Frontend**: React with TypeScript and Tailwind CSS
- **Backend**: NestJS with TypeScript
- **Database**: PostgreSQL
- **Containerization**: Docker and Docker Compose

The application allows businesses to:

- Manage products inventory
- Record and track sales
- Perform stock counts
- Generate stock balance reports
- User management with role-based access control

## Running the App with Docker Compose

For easy startup and development, we've created scripts to manage the application:

### Quick Start

1. Make sure you have Docker and Docker Compose installed on your system
2. Run the following command in the root directory:

docker-compose up

### Access the Application

- Frontend: http://localhost:3002
- Backend API: http://localhost:3001
- Database: PostgreSQL running on port 5432

### Running Components Separately

If you prefer to run components individually:

- **Backend only**: Navigate to the backend folder and run:

  ```bash
  cd backend
  npm install
  npm run start
  ```

- **Frontend only**: Navigate to the frontend folder and run:
  ```bash
  cd frontend
  npm install
  npm start
  ```

### API Documentation

The backend provides a Swagger UI for API documentation:

- Visit http://localhost:3001/api to view the Swagger UI

### Production Deployments

- **Backend and PostgreSQL DB**: Hosted on Railway

  - API URL: https://modish-log-production.up.railway.app

- **Frontend**: Hosted on Vercel
  - URL: https://modish-log.vercel.app/

## Features

### User Management

| Feature                       | Status |
| ----------------------------- | ------ |
| User login                    | ✅     |
| User logout                   | ✅     |
| Role-based access control     | ✅     |
| Create new users (Admin only) | ✅     |
| View user list (Admin only)   | ✅     |
| Edit user roles               | ✅     |
| Reset password                | ⏳     |

### Product Management

| Feature                             | Status |
| ----------------------------------- | ------ |
| Create/add products                 | ✅     |
| View all products                   | ✅     |
| View single product                 | ✅     |
| Edit/update products                | ✅     |
| Delete products                     | ✅     |
| Add quantities to existing products | ✅     |

### Sales Management

| Feature                          | Status |
| -------------------------------- | ------ |
| Create/add sales                 | ✅     |
| View all sales                   | ✅     |
| View individual sale             | ✅     |
| Edit sales                       | ✅     |
| Delete sales                     | ✅     |
| Update sale status (paid/unpaid) | ✅     |
| Add comments to sales            | ✅     |
| View product sale history        | ✅     |

### Stock Management

| Feature                                  | Status |
| ---------------------------------------- | ------ |
| Enter counted goods                      | ✅     |
| Generate automatic stock balance reports | ✅     |
| Track stock shortages or overages        | ✅     |
| View products with quantity remaining    | ✅     |

### Data Management

| Feature                                   | Status |
| ----------------------------------------- | ------ |
| Price history tracking                    | ✅     |
| Price updates don't affect previous sales | ✅     |

## Planned Enhancements

- Total value of stock/goods remaining
- Total sales per day
- Filter sales by date
- Attach payment receipt to sale

## Development Guidelines

### Validation Rules

- Sale quantity cannot be zero
- Negative values are not allowed for product quantities
- Negative values are not allowed for sale quantities
- Negative values are not allowed for product price updates

### Quality Checks

- Create history entries to show sales date changes in stock
- Implement comprehensive error handling
- Add form validation on frontend
- Ensure responsive design for all screen sizes

## API Reference

### Products API

#### Create a Product

```http
POST /api/products
```

Request body:

```json
{
  "color": "Red",
  "size": "M",
  "quantity": 100,
  "price": 10.5
}
```

#### Update a Product

```http
PUT /api/products/:id
```

Request body:

```json
{
  "price": 15.75,
  "quantity": 150
}
```

### Sales API

#### Create a Sale

```http
POST /api/sales
```

Request body:

```json
{
  "productId": "uuid-here",
  "quantitySold": 5
}
```

### Users API

#### Create a User

```http
POST /api/users
```

Request body:

```json
{
  "username": "username",
  "password": "password123",
  "role": "admin"
}
```

## Database Information

### Entity Relationship

The database consists of the following main entities:

- **User**: Stores user accounts with authentication details and roles
- **Product**: Manages product information including color, size, quantity, and price
- **Sale**: Records sales transactions linked to products
- **StockCount**: Tracks manual stock counting operations
- **StockBalanceReport**: Stores reports comparing actual stock counts to expected inventory levels

### Database Migrations

If you need to create a new migration:

```bash
cd backend
npm run typeorm:migration:generate -- ./src/migrations/YourMigrationName
```

To run migrations manually:

```bash
npm run typeorm:migration:run
```

### New Migration Strategy

The application now uses TypeScript migration files that:

1. Create all necessary database tables with proper relationships
2. Add seed data including admin user and sample products
3. Create indexes for performance optimization

## Verification and Testing

The application has been thoroughly tested with the following verifications:

1. Database tables properly created (user, product, sale, stock_count, stock_balance_report)
2. Admin user creation and authentication working
3. Product management (CRUD operations) functioning correctly
4. Sales recording functionality operational
5. Stock counting and reporting features working as expected

## Security

The application implements several security measures:

1. **Authentication**: JWT-based authentication with token expiration
2. **Password Security**: Passwords are hashed using bcrypt before storage
3. **Authorization**: Role-based access control for protected endpoints
4. **Input Validation**: Server-side validation for all API requests


## Troubleshooting

1. Check Docker container logs: `docker logs [container-name]`


## Technical Architecture

### Technologies Used

#### Backend

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT-based with role-based access control
- **API Documentation**: Swagger UI

#### Frontend

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **API Communication**: Axios

#### Infrastructure

- **Containerization**: Docker and Docker Compose
- **CI/CD**: Vercel (frontend) and Render (backend)
- **Version Control**: Git

## License

This project is licensed under the MIT License - see the LICENSE file for details.