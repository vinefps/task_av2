const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const prometheusMiddleware = require('express-prometheus-middleware');

dotenv.config();

const app = express();


app.use(
    prometheusMiddleware({
        metricsPath: '/metrics', // Caminho onde as métricas serão expostas
        collectDefaultMetrics: true, // Coletar métricas padrão do Node.js
        requestDurationBuckets: [0.1, 0.5, 1, 1.5], // Histogramas para duração das requisições
    })
);

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
