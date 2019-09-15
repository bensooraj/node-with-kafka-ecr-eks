const express = require('express');
const router = express.Router();
const { kafkaProduceMessage } = require('../kafkaProducer');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({
        message: "Home Page"
    });
});

/* GET Test Kafka Message Production. */
router.get('/kafka-test/:message', function (req, res, next) {

    kafkaProduceMessage('s3-upload-topic', {
        type: 'TEST',
        action: 'PROCESS_TEST_MESSAGE',
        params: {
            message: req.params['message']
        }
    }, (error, data) => {

        if (error) {
            return res.json({
                message: req.params['message'],
                error
            });
        }

        res.json({
            message: req.params['message'],
            data
        });
    });

});

module.exports = router;
