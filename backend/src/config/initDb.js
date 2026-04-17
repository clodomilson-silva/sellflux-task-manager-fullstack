const fs = require('fs');
const path = require('path');
const client = require('./db');

const initDatabase = () => {
  const schemaPath = path.join(__dirname, '../../../db/schema.sql');

  fs.readFile(schemaPath, 'utf8', (err, sql) => {
    if (err) {
      console.error('Erro ao ler schema.sql:', err);
      return;
    }

    client.query(sql, [], (err) => {
      if (err) {
        console.error('Erro ao executar schema:', err.message);
      } else {
        console.log('Schema aplicado com sucesso');
      }
    });
  });
};

module.exports = initDatabase;