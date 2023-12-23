FROM node:20

WORKDIR /server

COPY package.json .
COPY package-lock.json ./
RUN npm install

EXPOSE 3001

COPY . ./

CMD ["node", "server.js", "localhost:3001" ]
