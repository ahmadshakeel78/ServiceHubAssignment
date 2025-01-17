# Service Hub - Full Stack Assignment

## Overview
Service Hub is a full-stack web application designed to manage services and submissions. The application includes authentication, dynamic form rendering based on service configurations, data visualization through a dashboard, and a robust backend API.

---

## Features
1. **Authentication**:
   - JWT-based authentication.
   - Secure login and logout functionality.

2. **Dynamic Form Rendering**:
   - Displays available services retrieved from the backend.
   - Generates forms dynamically based on selected service configurations.
   - Validates form inputs (e.g., regex, max length).

3. **Submissions Management**:
   - Lists all submissions with sorting, filtering, and pagination.
   - Allows viewing submission details.

4. **Dashboard**:
   - Visualizes:
     - Total submissions per service.
     - Daily submission trends.
     - Most frequently used services.

---

## Tech Stack
- **Frontend**: Angular, TypeScript, Chart.js
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB (local or MongoDB Atlas)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ServiceHub
```

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   PORT=5001
   JWT_SECRET=your_secret_key
   MONGO_URI=mongodb://localhost:27017/ServiceHubDb
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
5. The API will run at `http://localhost:5001`.

### 3. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   ng serve
   ```
4. Access the frontend at `http://localhost:4200`.

---

## Database Setup

### Using MongoDB
1. Install MongoDB locally or use MongoDB Atlas.
2. Start MongoDB:
   ```bash
   mongod --dbpath <data-directory>
   ```
3. Import sample data:
   ```bash
   mongoimport --db ServiceHubDb --collection services --file services.json --jsonArray
   mongoimport --db ServiceHubDb --collection submissions --file submissions.json --jsonArray
   ```

---

## API Endpoints

### Authentication
- **POST /api/auth/login**: Authenticate and retrieve a JWT token.
  ```json
  {
    "username": "admin",
    "password": "password"
  }
  ```

### Services
- **GET /api/services**: Retrieve all available services.

### Submissions
- **GET /api/services/submissions?page=1**: Retrieve submissions with pagination.
- **POST /api/services/submissions**: Submit form data.

### Dashboard Metrics
- **GET /api/services/reporting/**: Retrieve total submissions, daily trends, and most-used services.

### Swagger
- http://localhost:5001/api-docs/#/
---

## Deployment Instructions

### Frontend
1. Build the Angular app:
   ```bash
   npm run ng build
   ```
2. Deploy the `dist/` folder to a hosting platform (e.g., Netlify, Vercel).

### Backend
1. Deploy the backend to a platform like Render, Railway, or Heroku.
2. Configure environment variables for production (`JWT_SECRET`, `MONGO_URI`).

### Database
1. Use MongoDB Atlas for a managed cloud database.
2. Update the `MONGO_URI` in the `.env` file.



---

## License
This project is for educational purposes as part of a technical assignment. All rights reserved.

