const express = require('express');

const productRoutes = require('./routes/products.routes')

const db = require('./db/connect');

// Connecting DB
db();

const app = express();

app.use(express.json()) // Parsing the req into JSON.

// Attaching the routes (middleware)
app.use(productRoutes);

app.listen(8123, () => {
    console.log('App is running on PORT 8123')
});