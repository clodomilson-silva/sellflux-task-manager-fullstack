const app = require('./src/app');
const initDatabase = require('./src/config/initDb');

const PORT = process.env.PORT || 3000;

initDatabase((err) => {
  if (err) {
    console.error('Falha na inicializacao do banco. Servidor nao iniciado.');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});