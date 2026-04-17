const app = require('./src/app');
const initDatabase = require('./src/config/initDb');

const PORT = process.env.PORT || 3000;

initDatabase();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});