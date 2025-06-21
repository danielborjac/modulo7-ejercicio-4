FROM node:20-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY package*.json ./
RUN npm install

COPY . .

# Exponer puerto
EXPOSE 3000

CMD ["npm", "start"]