# 🚀 Task Manager - Desafio Técnico Sellflux

## 📌 Descrição

Aplicação fullstack para gerenciamento de tarefas, permitindo:

* Criar tarefas
* Listar tarefas
* Marcar como concluída
* Excluir tarefas
* Adicionar comentários por tarefa

---

## 🧠 Destaque Técnico

A aplicação backend foi desenvolvida seguindo rigorosamente os requisitos eliminatórios do desafio:

* Uso de **I/O assíncrono com callbacks nativos**
* Execução de queries com **SQL puro parametrizado** (`$1`, `$2`)
* **Sem uso de async/await ou Promises no backend**
* Arquitetura organizada em:

  * `routes/`
  * `controllers/`
  * `models/`

---

## ⚙️ Tecnologias Utilizadas

### Backend

* Node.js
* Express
* PostgreSQL
* Docker

### Frontend

* React
* TypeScript
* Axios

### Testes

* Jest
* Supertest (com mocks da camada de models)

---

## 📁 Estrutura do Projeto

```bash
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── config/
│   │   └── __tests__/
│   └── Dockerfile
│
├── frontend/
│
├── db/
│   └── schema.sql
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## ▶️ 🚀 Execução Rápida (Recomendado)

Suba toda a aplicação com um único comando:

```bash
docker-compose up --build
```

### 🔥 O que será iniciado automaticamente:

* PostgreSQL com banco criado automaticamente
* Execução do `schema.sql`
* Backend conectado ao banco

### 🌐 API disponível em:

```
http://localhost:3000
```

---

## 🧪 Teste rápido da API

```bash
curl -X GET http://localhost:3000/tasks
```

---

## 🔧 Configuração de Ambiente

Crie o arquivo `.env` a partir do exemplo:

### Linux/macOS

```bash
cp .env.example .env
```

### Windows (PowerShell)

```powershell
Copy-Item .env.example .env
```

---

## 📄 Exemplo de `.env.example`

```env
PORT=3000
CORS_ORIGINS=http://localhost:3001,http://localhost:3000

DATABASE_URL=postgres://USER:PASSWORD@localhost:5432/tasks_db

POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_database
```

---

## ▶️ Executando Localmente (sem Docker)

### 1. Iniciar PostgreSQL (por sistema operacional)

#### Linux
```bash
sudo systemctl start postgresql
```

#### macOS (Homebrew)

```bash
brew services start postgresql
```

#### Windows

```powershell
net start postgresql-x64-15
```

### 2. Acessar o PostgreSQL e criar banco

```sql
CREATE DATABASE tasks_db;
```

Exemplo para abrir o cliente SQL:

- Linux/macOS: `psql -U postgres`
- Windows: usar pgAdmin ou `psql` do diretório de instalação do PostgreSQL.

### 3. Rodar backend

```bash
cd backend
npm install
npm start
```

---

## ⚛️ Executando Frontend

O frontend **não está dockerizado (intencionalmente)**, conforme escopo do desafio.

```bash
cd frontend
npm install
npm start
```

Por padrão, o frontend roda em `http://localhost:3001` e consome a API em `http://localhost:3000`.

> O backend pode ser executado tanto localmente quanto via Docker.

---

## 🧪 Testes

Os testes foram implementados com Jest e utilizam **mocks da camada de models**, garantindo execução isolada (sem acesso ao banco real).

```bash
cd backend
npm test
```

---

## 🔌 Endpoints da API

### 📌 Criar tarefa

```http
POST /tasks
```

**Body:**

```json
{
  "title": "Minha tarefa",
  "description": "Descrição opcional"
}
```

---

### 📌 Listar tarefas

```http
GET /tasks
```

---

### 📌 Marcar como concluída

```http
PATCH /tasks/:id
```

---

### 📌 Deletar tarefa

```http
DELETE /tasks/:id
```

---

### 📌 Criar comentário

```http
POST /tasks/:id/comments
```

**Body:**

```json
{
  "content": "Comentário da tarefa"
}
```

---

### 📌 Listar comentários

```http
GET /tasks/:id/comments
```

---

## 🧠 Observação sobre Assincronismo

A restrição de uso exclusivo de callbacks foi aplicada **apenas no backend**, conforme especificado no desafio.

No frontend, foram utilizadas práticas modernas do ecossistema React (Axios/Promises), garantindo melhor legibilidade e aderência aos padrões atuais.

---

## 🎯 Considerações Finais

* Backend desenvolvido conforme requisitos técnicos do desafio
* Testes unitários isolados com mocks
* Execução simplificada com Docker
* Frontend funcional e integrado à API
* Projeto organizado e de fácil execução para avaliação

---

## 👨‍💻 Autor

Desenvolvido por Clodomilson, como parte de teste técnico para a Sellflux.