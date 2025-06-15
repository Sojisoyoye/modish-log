# Database Migrations Guide

The Modish-Log application uses TypeORM migrations to manage database schema changes. This allows for proper version control of database changes and safe deployment to production environments.

## Migration Files

The migration files are located in `backend/src/migrations/` and are written in TypeScript. The migration files include:

1. **1718304000000-InitialSchema.ts** - Creates all the necessary tables and their relationships
2. **1718304000001-SeedData.ts** - Adds seed data including admin user and sample data
3. **1718304000002-AddIndexes.ts** - Adds database indexes for better performance

## Running Migrations

There are several ways to run migrations:

### During Application Startup

The migrations will automatically run when starting the application in development or production mode. This behavior is controlled in the `bootstrap()` function in `src/main.ts`.

### Using the Migration Script

To run migrations independently:

```bash
cd backend
npm run migration:run
```

This command runs the TypeScript migrations directly using ts-node.

### Using the Seed Script

To only run the data seeding:

```bash
cd backend
npm run seed
```

This command connects to the database and executes the seeding functions directly.

## Creating New Migrations

To create a new migration file:

```bash
cd backend
npm run typeorm:migration:create -- src/migrations/MigrationName
```

Then edit the created file to include the necessary schema changes.

## Troubleshooting

If you encounter issues with migrations:

1. Check that your database connection settings are correct in the `.env` file
2. Make sure all previous migrations have been run successfully
3. Try running migrations manually with `npm run migration:run`
4. Check the logs for specific error messages

## Migration Strategy

The project uses timestamp-based migrations to ensure they run in the correct order. When adding new migrations, make sure to use a timestamp later than the existing ones.
