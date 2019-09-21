# Remove all exited containers
docker rm $(docker ps -a -f status=exited -q)

# Build the Node.js API + Kafka Producer Image
docker build -t nodejs-api-kafka-producer-app:v1 .

# Build the Node.js Kafka Consumer Image
docker build -t nodejs-kafka-consumer-app:v1 .