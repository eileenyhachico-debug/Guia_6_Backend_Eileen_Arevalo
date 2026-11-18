const express = require('express');
const pilotRoutes = require('./routes/pilotRoutes');
const airplaneRoutes = require('./routes/airplaneRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Montaje de rutas de la aerolínea
app.use('/api/pilotos', pilotRoutes);
app.use('/api/aviones', airplaneRoutes);
app.use('/api/asignaciones', assignmentRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ mensaje: 'Backend de Aerolínea operativo con arquitectura modular' });
});

app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});
