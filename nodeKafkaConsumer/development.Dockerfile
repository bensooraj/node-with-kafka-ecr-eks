FROM node:12.10
RUN npm install pm2 -g

WORKDIR /app
COPY package.json /app
RUN npm install

COPY . /app

CMD ["pm2-runtime", "start", "ecosystem.config.js", "--only", "nodejs-kafka-consumer-app"]
