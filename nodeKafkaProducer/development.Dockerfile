FROM node:12.10
RUN npm install pm2 -g
WORKDIR /app
COPY package*.json /app/
RUN npm install

COPY . /app
RUN ls /usr/local/bin/

CMD ["node", "./bin/www"]

# replace this with your application's default port
EXPOSE 3000