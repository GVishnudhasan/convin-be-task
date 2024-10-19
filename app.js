const express = require("express");
const dotenv = require("dotenv");
const sessions = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

dotenv.config({ path: ".env" });

if (
  !process.env.PORT ||
  !process.env.SESSION_SECRET ||
  !process.env.CLIENT_URL
) {
  console.error("Error: .env file missing required environment variables.");
  process.exit(1);
}

require("./config/db");

const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const PORT = process.env.PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  sessions({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
  })
);

app.use(cookieParser());

const allowedOrigins = [CLIENT_URL, "http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile_no apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.get("/", (_, res) => {
  res.json({ message: "Server Set Up Successfully (Health Check)" });
});

// Use user routes for requests to /api/users
app.use("/api/users", userRoutes);
// Use expense routes for requests to /api/expenses
app.use("/api/expenses", expenseRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
