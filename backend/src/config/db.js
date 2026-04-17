const { Client } = require('pg');
const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '../../../.env'),
  quiet: true
});

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

//  Só conecta se NÃO estiver em teste
if (process.env.NODE_ENV !== 'test') {
  client.connect((err) => {
    if (err) {
      console.error('Erro ao conectar no banco:', err.stack);
    } else {
      console.log('Conectado ao PostgreSQL');
    }
  });
}

module.exports = client;