module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [

        // NodeJS API Application + Kafka Producer
        {
            name: 'nodejs-api-kafka-producer-app',
            script: './nodeKafkaProducer/bin/www',
        },

        // NodeJS Kafka Consumer Application
        {
            name: 'nodejs-kafka-consumer-app',
            script: './nodeKafkaConsumer/kafkaConsumer.js'
        }
    ],

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
        production: {

        },
        dev: {

        }
    }
};
