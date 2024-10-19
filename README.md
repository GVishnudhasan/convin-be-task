# Daily Expenses Sharing Application

A backend service designed to manage and share daily expenses among participants, supporting equal, exact, and percentage-based splits. The application provides user and expense management functionality, input validation, and downloadable balance sheets.

## Objective

This application allows users to add expenses and split them in three different ways—equal, exact, and percentage. It ensures proper data management, input validation, and offers a downloadable balance sheet for detailed financial tracking.

## Features

- **User Management**: Register users with an email, name, and mobile number.
- **Expense Management**: 
  - Split expenses using three methods: Equal, Exact, and Percentage.
  - Add, retrieve, and view individual or overall expenses.
  - Ensure that percentages in the Percentage split method add up to 100% and Exact split method adds upto total amount.
- **Balance Sheet**: 
  - Show individual expenses for each user.
  - Show overall expenses across all users.
  - Downloadable balance sheet for easy financial tracking.
- **User Authentication**: Secure user registration and login using JSON Web Tokens (JWT).
- **Optimized Queries**: Ensure high performance for retrieving expense details even with large datasets.
- **Error Handling**: Robust error handling and input validation to ensure data integrity.

## Technologies Used

- **Node.js**: Backend framework.
- **Express.js**: Web framework for handling API routes.
- **MongoDB**: Database for storing user and expense details.
- **JWT (JSON Web Tokens)**: For user authentication and authorization.

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/GVishnudhasan/convin-be-task
cd convin-be-task
```

### 2. Install dependencies
```bash
npm install --save --save-dev
```

### 3. Set up environment variables
- Create a `.env` file in the root directory and add the following environment variables:
```bash
PORT="8080"
DB="mongodb+srv://example.com/db"
CLIENT_URL=http://localhost:3000
JWT_SECRET=your-secret-key
```

### 4. Start the server
```bash
npm run dev
```

## API Endpoints

### User Management
- **POST** `/api/users/` - Register a new user with email, name, and mobile number.
- **POST** `/api/users/login` - Login an existing user with email and password.
- **GET** `/api/users/logout` - Logout the current user.
- **GET** `/api/users/:id` - Retrieve user details by user ID.

### Expense Management
- **POST** `/api/expenses/` - Add a new expense with an equal, exact, or percentage split.
- **GET** `/api/expenses/individual` - Retrieve individual expenses for a specific user.
- **GET** `/api/expenses/overall` - Retrieve the overall expenses for all users.
- **GET** `/api/expenses/balance-sheet` - Download a balance sheet of all expenses.

## Expense Calculation Methods

1. **Equal Split**:
   - Total amount is split equally among all participants.
   - Example: A bill of 3000 is split equally among 3 friends, each paying 1000.
   
2. **Exact Amount**:
   - Specify the exact amount each participant owes.
   - Example: A shopping expense of 4299 is split where Friend 1 owes 799, Friend 2 owes 2000, and you owe 1500.

3. **Percentage Split**:
   - Specify the percentage of the total amount each participant owes.
   - Ensure the percentages add up to 100%.
   - Example: At a party with two friends and a cousin, you owe 50%, Friend 1 owes 25%, and Friend 2 owes 25%.

## Data Validation

- **User Data**: Validate user input fields (email, name, mobile number) during registration and login.
- **Expense Data**: Validate that:
  - The total percentage for the percentage split method adds up to exactly 100%.
  - Correct amounts are provided in the exact split method.

## Here are example `curl` commands for all the API endpoints:

### 1. **Register a New User**
```bash
curl -X POST http://localhost:8080/api/users/ \
-H "Content-Type: application/json" \
-d '{
  "email": "user@example.com",
  "name": "John Doe",
  "mobile": "1234567890",
  "password": "securepassword"
}'
```

### 2. **Login User**
```bash
curl -X POST http://localhost:8080/api/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "user@example.com",
  "password": "securepassword"
}'
```

### 3. **Logout User**
```bash
curl -X GET http://localhost:8080/api/users/logout \
-H "Authorization: Bearer <JWT_TOKEN>"
```

### 4. **Get User Details**
```bash
curl -X GET http://localhost:8080/api/users/<USER_ID> \
-H "Authorization: Bearer <JWT_TOKEN>"
```

### 5. **Add a New Expense**
```bash
curl -X POST http://localhost:8080/api/expenses/ \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <JWT_TOKEN>" \
-d '{
  "description": "Dinner with friends",
  "amount": 3000,
  "splitMethod": "equal",  // or "exact" or "percentage"
  "participants": [
    { "userId": "<USER_ID_1>" },
    { "userId": "<USER_ID_2>" },
    { "userId": "<USER_ID_3>" }
  ],
  "splits": [
    { "userId": "<USER_ID_1>", "amount": 1000 }, // for "exact" or percentage split method
    { "userId": "<USER_ID_2>", "amount": 1000 },
    { "userId": "<USER_ID_3>", "amount": 1000 }
  ]
}'
```

### 6. **Get Individual Expenses**
```bash
curl -X GET http://localhost:8080/api/expenses/individual \
-H "Authorization: Bearer <JWT_TOKEN>"
```

### 7. **Get Overall Expenses**
```bash
curl -X GET http://localhost:8080/api/expenses/overall \
-H "Authorization: Bearer <JWT_TOKEN>"
```

### 8. **Download Balance Sheet**
```bash
curl -X GET http://localhost:8080/api/expenses/balance-sheet \
-H "Authorization: Bearer <JWT_TOKEN>" \
-o balance-sheet.csv
```

---

Replace `<JWT_TOKEN>`, `<USER_ID>`, and other placeholders with actual values as needed. The `balance-sheet.csv` will be saved in your current directory after downloading.

Let me know if you'd like more details or clarifications on any of the requests!
