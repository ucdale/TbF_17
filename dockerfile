FROM node:22-slim

#Create a app direcotry
WORKDIR /app

#Install app dependencies
COPY package*.json ./

#Run npm install
RUN npm ci

COPY . .

EXPOSE 3001

# Comando per avviare l'applicazione
CMD ["npm", "run", "start:backend"]