# Eat-fit Backend

A Node.js/Express backend for the Eat-fit application, providing APIs for user management, meal planning, and dietary tracking.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/eatfit
   JWT_SECRET=your-secret-key-here
   ```
4. Make sure MongoDB is running locally

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get user profile
- PATCH `/api/auth/profile` - Update user profile

### Meals
- GET `/api/meals` - Get all meals
- GET `/api/meals/:id` - Get meal by ID
- POST `/api/meals` - Create new meal (admin only)
- PATCH `/api/meals/:id` - Update meal (admin only)
- DELETE `/api/meals/:id` - Delete meal (admin only)
- GET `/api/meals/category/:category` - Get meals by category
- GET `/api/meals/dietary/:tag` - Get meals by dietary tag

### Users
- GET `/api/users` - Get all users (admin only)
- GET `/api/users/:id` - Get user by ID (admin only)
- DELETE `/api/users/:id` - Delete user (admin only)
- GET `/api/users/:id/meal-plan` - Get user's meal plan
- PATCH `/api/users/:id/dietary-preferences` - Update user's dietary preferences

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-token>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages in the following format:
```json
{
  "message": "Error message here"
}
```

## Security

- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Input validation is performed on all routes
- CORS is enabled for cross-origin requests 