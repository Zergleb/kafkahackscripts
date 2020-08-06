console.log('starting')
// var kafka = require('kafka-node');
const commandLineArgs = require('command-line-args')
const optionDefinitions = [
    { name: 'topics', alias: 't', type: String, multiple: true },
  ]
const options = commandLineArgs(optionDefinitions)

var kafkaClientOption = {
  clientId: 'kafkaws',
  kafkaHost : 'kafka:9093',
  ssl: true,
  sslOptions: {
    rejectUnauthorized: false,
  },
  autoConnect: true,
  connectTimeout: 1000,
  requestTimeout: 1000
}

var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    KeyedMessage = kafka.KeyedMessage,
    client = new kafka.KafkaClient(kafkaClientOption),
    producer = new Producer(client),
    km = new KeyedMessage('key', 'message'),
    payloads = [
        { topic: 'hl7Messages', messages: 'hi', partition: 0 },
        { topic: 'NOTIF_CRITERIA_EVALUATION_LOCAL', messages: ['hello', 'world', km] }
    ];
producer.on('ready', function () {
    producer.send(payloads, function (err, data) {
        console.log(data);
    });
});

producer.on('error', function (err) {
    console.log(err);
})