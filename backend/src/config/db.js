const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

client.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco:', err.stack);
  } else {
    console.log('Conectado ao PostgreSQL');
  }
});

module.exports = client;