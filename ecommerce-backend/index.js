require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

const productRoutes = require("./routes/products.routes");
const authRoutes = require("./routes/auth.routes");

const db = require("./db/connect");

// Connecting DB
db();

const app = express();

app.use(express.json()); // Parsing the req into JSON.
app.use(cookieParser());

// Attaching the routes (middleware)
app.use("/api/v1", authRoutes);
app.use("/api/v1", productRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("App is running on PORT: ", PORT);
});

// http://localhost:8123/v1/products
// http://localhost:8123/v1/product/:productId
