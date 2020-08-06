console.log('starting')
var kafka = require('kafka-node');
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

console.log("Starting Client then will search for topics", topics)
const client = new kafka.KafkaClient(kafkaClientOption);
var offset = new kafka.Offset(client);
var topics = options['topics'];
console.log("Searching for topics: ", topics)
offset.fetchLatestOffsets(topics, function (error, offsets) {
    if (error) {
        console.log(error);
    } else {
        console.log(offsets);
    }
    process.exit(0);
});