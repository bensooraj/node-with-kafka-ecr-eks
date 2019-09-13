module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [

        // NodeJS API Application
        {
            name: 'nodejs-api-app',
            script: './bin/www',
        },

        // NodeJS Kafka Consumer Application
        // {
        //     name: 'WEB',
        //     script: 'web.js'
        // }
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
