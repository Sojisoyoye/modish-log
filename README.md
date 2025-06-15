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

   ```bash
   docker-compose up
   ```

   This command will build and start all services defined in the docker-compose.yml file (frontend, backend, and PostgreSQL).

   To run the services in detached (background) mode:

   ```bash
   docker-compose up -d
   ```

### Stopping the Application

To stop the running containers:

```bash
docker-compose down
```

To stop the containers and remove volumes (this will delete the database data):

```bash
docker-compose down -v
```

### Rebuilding Services

If you make changes to the Dockerfile or service configuration, rebuild the containers:

```bash
docker-compose up --build
```

### Docker Commands for Debugging

#### View Running Containers

```bash
docker ps
```

#### Check Container Logs

View logs for all services:

```bash
docker-compose logs
```

View logs for a specific service (e.g., backend, frontend, db):

```bash
docker-compose logs backend
```

Follow logs in real-time:

```bash
docker-compose logs -f backend
```

#### Accessing Containers

To get a shell inside a running container:

```bash
docker exec -it modish-log-backend sh
```

To execute a specific command in a container:

```bash
docker exec -it modish-log-backend npm run migration:run
```

#### Inspecting Container Resources

View container resource usage (CPU, memory):

```bash
docker stats
```

### Accessing and Managing the PostgreSQL Database

The PostgreSQL database runs in its own container and stores data in a Docker volume. Here are ways to interact with it:

#### Connecting to the PostgreSQL Database

Connect to the database using the `psql` command inside the database container:

```bash
docker exec -it modish-log_db_1 psql -U postgres -d inventory
```

If the container name is different, you can find it using `docker ps`.

#### Common PostgreSQL Commands

Once connected to the database with psql, you can use these commands:

```sql
-- List all databases
\l

-- Connect to a specific database
\c inventory

-- List all tables in the current database
\dt

-- Describe a specific table
\d users

-- Execute a SQL query
SELECT * FROM users;

-- Exit the psql client
\q
```

#### Backing Up the Database

Create a database backup:

```bash
docker exec -it modish-log_db_1 pg_dump -U postgres inventory > backup.sql
```

#### Restoring the Database

Restore from a backup:

```bash
cat backup.sql | docker exec -i modish-log_db_1 psql -U postgres -d inventory
```

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

## CI/CD Pipeline

The project uses a separated CI/CD approach with GitHub Actions:

### CI Pipeline (`ci.yml`)

The CI pipeline focuses on code quality and builds:

1. **Linting**: Checks code quality and formatting

   - Frontend: ESLint, TypeScript type checking
   - Backend: TypeScript type checking

2. **Testing**: Runs unit tests for both frontend and backend

3. **Building**: Ensures the application builds successfully
   - Frontend: React build process
   - Backend: NestJS build process

### CD Pipeline (`cd.yml`)

The CD pipeline handles deployment to different environments:

1. **Automatic Deployments**:

   - Changes to the main branch trigger deployment to the acceptance environment

2. **Manual Deployments**:

   - Deployments to sandbox and production environments can be triggered manually
   - Uses environment-specific configuration for Render and Vercel

3. **Environment Support**:
   - Acceptance: For testing changes in a staging environment
   - Sandbox: For pre-production verification
   - Production: For end-user access

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.


## Deployment

### Continuous Deployment Pipeline

The project uses GitHub Actions for continuous deployment to both Render (backend) and Vercel (frontend).

#### Backend Deployment (Render)

The backend is deployed to Render using the following configuration:

1. **Render Configuration**: A `render.yaml` file in the root directory defines the backend service and database.
2. **Environment Variables**:
   - `DATABASE_URL`: PostgreSQL connection string (auto-linked by Render)
   - `NODE_ENV`: Set to 'production' for production environment
   - `JWT_SECRET`: Secret key for JWT token generation
   - `PORT`: 3001

#### Frontend Deployment (Vercel)

The frontend is deployed to Vercel using the following configuration:

1. **Vercel Configuration**: The `vercel.json` file in both the root and frontend directories defines build settings and routing rules.
2. **Environment Variables**:
   - `REACT_APP_API_URL`: URL of the backend API, set in Vercel project settings
   - `REACT_APP_ENV`: Environment name (production, acceptance, sandbox)

### Deployment Environments

The CI/CD pipeline supports three deployment environments:

1. **Acceptance**: Automatically deployed on pull requests and pushes to main branch
2. **Sandbox**: Manually triggered deployment via GitHub workflow dispatch
3. **Production**: Manually triggered deployment via GitHub workflow dispatch


### Preview Deployments

For pull requests, Vercel automatically creates preview deployments for the frontend. This allows reviewers to test changes before merging to main.

## Technologies Used

- **Frontend**: React with TypeScript and Tailwind CSS
- **Backend**: NestJS with TypeScript
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
