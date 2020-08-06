var kafka = require('kafka-node');
var uuid = require('uuid');
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

var groupId = uuid.v4();
var consumerOptions = options.topics.map(t => {
  return { groupId: groupId, topic: t }
});

var Consumer = kafka.Consumer,
    client = new kafka.KafkaClient(kafkaClientOption),
    consumer = new Consumer(
        client,
        consumerOptions,
        {
            autoCommit: true
        }
    );

consumer.on('message', function (message) {
    console.log(message);
});
consumer.on('error', function (err) {
    console.error(err);
});