var kafka = require('kafka-node');
var uuid = require('uuid');

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

var Consumer = kafka.Consumer,
    client = new kafka.KafkaClient(kafkaClientOption),
    consumer = new Consumer(
        client,
        [ { groupId: uuid.v4(), topic: 'hl7Messages' } ],
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