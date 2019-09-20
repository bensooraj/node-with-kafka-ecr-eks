FROM node:12.10
RUN npm install pm2 -g

WORKDIR /app
COPY package.json /app
RUN npm install

COPY . /app
# COPY ecosystem.config.js /app
CMD ["pm2-runtime", "start", "ecosystem.config.js", "--only", "nodejs-api-kafka-producer-app"]

# replace this with your application's default port
EXPOSE 3000