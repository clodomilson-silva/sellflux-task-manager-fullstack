const fs = require('fs');
const path = require('path');
const client = require('./db');

const initDatabase = (done) => {
  if (process.env.SKIP_SCHEMA_INIT === 'true') {
    console.log('Inicializacao de schema ignorada por configuracao.');
    if (done) done();
    return;
  }

  const schemaPath = path.join(__dirname, '../../../db/schema.sql');

  fs.readFile(schemaPath, 'utf8', (err, sql) => {
    if (err) {
      console.error('Erro ao ler schema.sql:', err);
      if (done) done(err);
      return;
    }

    client.query(sql, [], (err) => {
      if (err) {
        console.error('Erro ao executar schema:', err.message);
      } else {
        console.log('Schema aplicado com sucesso');
      }
      if (done) done(err);
    });
  });
};

module.exports = initDatabase;