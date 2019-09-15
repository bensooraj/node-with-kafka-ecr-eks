const kafka = require('kafka-node'),

    ConsumerGroup = kafka.ConsumerGroup,

    // client = new kafka.KafkaClient({
    //     // A string of kafka broker/host combination delimited by comma
    //     kafkaHost: "kafka1:9092", // BROKER_HOST
    //     // ms it takes to wait for a successful connection before moving to the next host default: 10000
    //     connectTimeout: "10000", // BROKER_CONNECT_TIMEOUT
    //     // ms for a kafka request to timeout default: 30000
    //     requestTimeout: "60000", // BROKER_REQUEST_TIMEOUT
    //     // automatically connect when KafkaClient is instantiated otherwise you need to manually call connect default: true
    //     autoConnect: true, // BROKER_AUTO_CONNECT
    //     // maximum async operations at a time toward the kafka cluster. default: 10
    //     maxAsyncRequests: 10, // BROKER_MAX_ASYNC_REQUESTS
    // })

    consumerGroupOptions = {
        kafkaHost: 'kafka1:9092', // connect directly to kafka broker (instantiates a KafkaClient)
        batch: undefined, // put client batch settings if you need them
        ssl: true, // optional (defaults to false) or tls options hash
        groupId: 'ExampleTestGroup',
        sessionTimeout: 15000,
        // An array of partition assignment protocols ordered by preference.
        // 'roundrobin' or 'range' string for built ins (see below to pass in custom assignment protocol)
        protocol: ['roundrobin'],
        encoding: 'utf8', // default is utf8, use 'buffer' for binary data

        // Offsets to use for new groups other options could be 'earliest' or 'none' (none will emit an error if no offsets were saved)
        // equivalent to Java client's auto.offset.reset
        fromOffset: 'latest', // default
        commitOffsetsOnFirstJoin: true, // on the very first time this consumer group subscribes to a topic, record the offset returned in fromOffset (latest/earliest)
        // how to recover from OutOfRangeOffset error (where save offset is past server retention) accepts same value as fromOffset
        outOfRangeOffset: 'earliest', // default
        // Callback to allow consumers with autoCommit false a chance to commit before a rebalance finishes
        // isAlreadyMember will be false on the first connection, and true on rebalances triggered after that
        onRebalance: (isAlreadyMember, callback) => { callback(); } // or null
    },

    consumerGroup = new ConsumerGroup(consumerGroupOptions, 's3-upload-topic');

consumerGroup.on('connect', () => {
    console.log("Kafka Consumer Group Connected");
});

consumerGroup.on('error', (error) => {
    console.log("Kafka Consumer Group Error: ", error);
});

consumerGroup.on('message', async (message) => {

});

// module.exports = {
//     consumerGroup
// };