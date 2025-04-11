const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const proposalsApi = require('./src/api/proposals');
const adminApi = require('./src/api/admin');
const notificationsApi = require('./src/api/notifications');
const { swaggerUi, swaggerSpec } = require('./src/docs/swagger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use('/api/proposals', proposalsApi);
app.use('/api/admin', adminApi);
app.use('/api/notifications', notificationsApi);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('yukichi.vote API is running');
});

app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));
