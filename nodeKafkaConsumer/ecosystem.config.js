module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [

        // NodeJS Kafka Consumer Application
        {
            name: 'nodejs-kafka-consumer-app',
            script: './kafkaConsumer.js'
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
