FROM node:14

WORKDIR /server
COPY package.json .
RUN npm install
COPY . ./

FROM mysql
EXPOSE 3306


CMD ["node", "server.js", "mysql", "-h 127.0.0.1 -P 3306 -u root -p"]
