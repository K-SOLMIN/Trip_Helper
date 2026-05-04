require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { swaggerUi, swaggerSpec } = require('./config/swagger');
const errorHandler = require('./middlewares/errorHandler');

const flightRoutes = require('./routes/flightRoutes');
const orderRoutes = require('./routes/orderRoutes');
const seatRoutes = require('./routes/seatRoutes');
const popularRoutes = require('./routes/popularRoutes');
const esimRoutes = require('./routes/esimRoutes');
const accomodationRoutes = require('./routes/accomodationRoutes');
const mapsRoutes = require('./routes/mapsRoutes');
const tourRoutes = require('./routes/tourRoutes');

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
}));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', flightRoutes);
app.use('/api', orderRoutes);
app.use('/api', seatRoutes);
app.use('/api', popularRoutes);
app.use('/api', esimRoutes);
app.use('/api', accomodationRoutes);
app.use('/api', mapsRoutes);
app.use('/api', tourRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  const BASE = process.env.BACKEND_URL || `http://localhost:${PORT}`;
  console.log(`Server:  ${BASE}`);
  console.log(`Swagger: ${BASE}/api-docs`);
});

process.stdin.resume();
