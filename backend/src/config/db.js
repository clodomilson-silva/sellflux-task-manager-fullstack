const { Pool } = require('pg');
const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '../../../.env'),
  quiet: true
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Só valida conexão se NÃO estiver em teste
if (process.env.NODE_ENV !== 'test') {
  pool.connect((err, client, release) => {
    if (err) {
      console.error('Erro ao conectar no banco:', err.stack);
      console.error('Encerrando aplicação — sem conexão com o banco de dados.');
      process.exit(1);
    } else {
      console.log('Conectado ao PostgreSQL');
      release();
    }
  });
}

module.exports = pool;