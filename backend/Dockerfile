# Imagem base leve
FROM node:20-alpine

# Diretório de trabalho
WORKDIR /app

# Copia dependências primeiro (cache eficiente)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta da API
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "start"]