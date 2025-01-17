const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const app = express();
const PORT = 5001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const serviceRoutes = require('./routes/serviceRoutes');
app.use('/api/services', serviceRoutes);

// Root Endpoint
app.get('/', (req, res) => {
    res.send('ServiceHubDb Backend is running!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
