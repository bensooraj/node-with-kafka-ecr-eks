# Remove all exited containers
docker rm $(docker ps -a -f status=exited -q)

# Build the Node.js API + Kafka Producer Image
docker build -t nodejs-api-kafka-producer-app:v1 .
docker build -t bensooraj/demo-node-producer:v1 .

# Build the Node.js Kafka Consumer Image
docker build -t nodejs-kafka-consumer-app:v1 .
docker build -t bensooraj/demo-node-consumer:v1 .

# Restart one Docker service by updating the image
docker-compose -f docker-compose/docker-compose.yml up -d --no-deps nodejs-consumer-service

# MySQL connection string
mysql -h mysql-service -P 3306 -u admin -p'pass+word'
# Quick check
kubectl run -i --tty --rm debug --image=mysql --restart=Never -- mysql -h mysql-service -P 3306 -u admin -p'pass+word'