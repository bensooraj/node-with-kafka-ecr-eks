const { Kafka, CompressionTypes } = require('kafkajs');

let kafkaBrokers = [];
if (process.env.KAFKA_BROKER_1 !== "") kafkaBrokers.push(`${process.env.KAFKA_BROKER_1}:9092`);
if (process.env.KAFKA_BROKER_2 !== "") kafkaBrokers.push(`${process.env.KAFKA_BROKER_2}:9092`);
if (process.env.KAFKA_BROKER_3 !== "") kafkaBrokers.push(`${process.env.KAFKA_BROKER_3}:9092`);

const kafka = new Kafka({
    clientId: 'kafka-node-producer',
    brokers: kafkaBrokers,
    connectionTimeout: 10000
});

const producer = kafka.producer()

const run = async () => {
    await producer.connect()
}

run().catch(e => console.error(`[node/producer] ${e.message}`, e))

const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

errorTypes.map(type => {
    process.on(type, async () => {
        try {
            console.log(`process.on ${type}`)
            await producer.disconnect()
            process.exit(0)
        } catch (_) {
            process.exit(1)
        }
    })
})

signalTraps.map(type => {
    process.once(type, async () => {
        try {
            await producer.disconnect()
        } finally {
            process.kill(process.pid, type)
        }
    })
})

module.exports = {
    kafkaProducer: producer,
    kafkaProduceMessage: async (topic, messages) => {
        try {
            const recordMetadata = await producer.send({
                topic,
                compression: CompressionTypes.GZIP,
                messages: [
                    { value: JSON.stringify(messages) }
                ],
            });
            return recordMetadata;
        } catch (error) {
            console.log("Error producing Kafka message: ", error);
            // throw new Error(error);
        }
    }
}