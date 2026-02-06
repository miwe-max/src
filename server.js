// src/server.js

// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

// Import DB connection
const connectDB = require("./config/db");

// Import Routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

// Import error handler
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Swagger Route
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Global Error Handler (must be last)
app.use(errorHandler);

// Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});