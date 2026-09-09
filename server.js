const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'reservations.json');

app.use(express.json());
app.use(express.static(__dirname));

// Inicializar reservations.json si no existe
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({}, null, 2), 'utf8');
}

// Obtener estado actual de las reservas
app.get('/api/reservations', (req, res) => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    res.json(JSON.parse(data || '{}'));
  } catch (err) {
    console.error('Error al leer el archivo JSON de reservas:', err);
    res.status(500).json({ error: 'No se pudieron obtener las reservas' });
  }
});

// Guardar o actualizar estado de reservas
app.post('/api/reservations', (req, res) => {
  try {
    const newState = req.body || {};
    fs.writeFileSync(DATA_FILE, JSON.stringify(newState, null, 2), 'utf8');
    res.json(newState);
  } catch (err) {
    console.error('Error al guardar el archivo JSON de reservas:', err);
    res.status(500).json({ error: 'No se pudieron guardar las reservas' });
  }
});

// Ruta principal para servir la pagina web
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor de reservas escuchando en el puerto ${PORT}`);
});
