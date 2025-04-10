FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Ge next rättigheter innan build
RUN chmod +x node_modules/.bin/next && npm run build

EXPOSE 3000

CMD ["npm", "start"]
