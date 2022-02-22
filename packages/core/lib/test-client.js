const { MicroService } = require('@black-moon-rewind/game-js');
const { messageReader } = require('./messaging');

const AMQP_URL = 'amqp://localhost';

(async () => {
  const worker = new MicroService();
  worker.use(messageReader);
  await worker.connect(AMQP_URL);
  worker.consume('registerAccountMessage', (message, client) => {
    console.log('registerAccountMessage', message, client);
  });

  // new PacketConsumer(channel, 'registerAccountMessage').pipe(new MessageReader());
  /*
  await channel.assertQueue('14', { durable: false });
  await channel.consume(
    '14',
    (msg) => {
      console.log('received', msg);
      channel.sendToQueue(msg.properties.replyTo, msg.content, {
        type: '14',
      });
    },
    { noAck: true }
  );
   */
})();
