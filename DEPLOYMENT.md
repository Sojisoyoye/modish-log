# Deployment Guide for Modish-Log

This guide outlines the steps to deploy the Modish-Log application using Render for the backend and Vercel for the frontend.

## CI/CD Workflow Architecture

Modish-Log uses a separated CI/CD workflow:

1. **CI Pipeline** (`.github/workflows/ci.yml`):

   - Handles code quality checks (linting, type checking)
   - Runs tests to ensure functionality
   - Builds the application and verifies it compiles correctly
   - Archives build artifacts for potential use

2. **CD Pipeline** (`.github/workflows/cd.yml`):
   - Triggered automatically on push to main branch
   - Can be manually triggered for specific environments
   - Deploys backend to Render
   - Deploys frontend to Vercel
   - Handles environment-specific configurations

This separation allows us to have clean, focused workflows for each part of the development lifecycle.

## Prerequisites

Before you begin, you'll need:

1. GitHub account with access to the repository
2. Render account (for backend deployment)
3. Vercel account (for frontend deployment)
4. Access to set up secrets in GitHub repository

## Setting Up Environment Variables

### GitHub Repository Secrets

Configure the following secrets in your GitHub repository:

1. `RENDER_API_KEY` - API key from Render dashboard
2. `RENDER_SERVICE_ID_ACCEPTANCE` - Service ID for acceptance environment on Render
3. `RENDER_SERVICE_ID_SANDBOX` - Service ID for sandbox environment on Render
4. `RENDER_SERVICE_ID_PRODUCTION` - Service ID for production environment on Render
5. `VERCEL_TOKEN` - Authentication token from Vercel
6. `VERCEL_ORG_ID` - Organization ID from Vercel
7. `VERCEL_PROJECT_ID_ACCEPTANCE` - Project ID for acceptance environment on Vercel
8. `VERCEL_PROJECT_ID_SANDBOX` - Project ID for sandbox environment on Vercel
9. `VERCEL_PROJECT_ID_PRODUCTION` - Project ID for production environment on Vercel
10. `REACT_APP_API_URL_ACCEPTANCE` - Base URL for backend API acceptance (e.g., https://modish-log-api)
11. `REACT_APP_API_URL_SANDBOX` - Base URL for backend API sandbox (e.g., https://modish-log-api)
11. `REACT_APP_API_URL_PRODUCTION` - Base URL for backend API production (e.g., https://modish-log-api)

### Render Environment Variables

Set the following environment variables in Render:

1. `NODE_ENV` - Should be set to 'production'
2. `JWT_SECRET` - Secret key for JWT authentication
3. `PORT` - Set to 3001
4. `DATABASE_URL` - PostgreSQL connection string (auto-linked by Render)
5. `JWT_EXPIRES_IN` - secret validation period

### Vercel Environment Variables

Set the following environment variables in Vercel:

1. `REACT_APP_API_URL` - URL of the backend API endpoint
2. `REACT_APP_ENV` - Environment name (acceptance, sandbox, production)

## Initial Setup

### Setting Up Render

1. Create a new web service in Render
2. Connect your GitHub repository
3. Configure the service using the settings from `render.yaml`:
   - Build Command: `cd backend && npm install && npm run build`
   - Start Command: `cd backend && node dist/main.js`
   - Health Check Path: `/api/health`
4. Set up environment variables
5. Create a PostgreSQL database and link it to your service

### Setting Up Vercel

1. Create a new project in Vercel
2. Connect your GitHub repository
3. Configure the build settings:
   - Framework Preset: Create React App
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Set up environment variables
5. Enable GitHub integration for automatic deployments

## Deployment Environments

### Acceptance Environment

- **When**: Automatically deployed on push to main branch
- **Purpose**: Testing changes before sandbox/production deployment

### Sandbox Environment

- **When**: Manually triggered via GitHub workflow
- **Purpose**: Pre-production environment for final validation

### Production Environment

- **When**: Manually triggered via GitHub workflow
- **Purpose**: Live application for end users

## Manual Deployment

To manually deploy to sandbox or production:

1. Go to the "Actions" tab in your GitHub repository
2. Select the "CD Pipeline" workflow
3. Click "Run workflow"
4. Choose the branch (usually main)
5. Select the environment (sandbox or production)
6. Click "Run workflow"

## Monitoring Deployments

### Render Deployments

Monitor backend deployments in the Render dashboard:

- View deployment logs
- Check service health status
- Monitor resource utilization

### Vercel Deployments

Monitor frontend deployments in the Vercel dashboard:

- View deployment history
- Check preview deployments for pull requests
- Monitor performance analytics

## Troubleshooting

### Common Issues

1. **Database Connection Errors**

   - Check DATABASE_URL environment variable
   - Verify database is running and accessible

2. **Build Failures**

   - Check build logs for errors
   - Verify dependencies are correctly specified

3. **Deployment Timeouts**

   - Check resource limits on Render
   - Optimize build process if needed

4. **API Connection Issues**
   - Verify REACT_APP_API_URL is correctly set
   - Check CORS configuration in backend

## Rollback Procedure

### Rolling Back Backend (Render)

1. Go to the Render dashboard
2. Navigate to your service
3. Select the previous working deployment
4. Click "Rollback to this deploy"

### Rolling Back Frontend (Vercel)

1. Go to the Vercel project dashboard
2. Navigate to the "Deployments" section
3. Find the last working deployment
4. Click on the three dots and select "Promote to Production"
