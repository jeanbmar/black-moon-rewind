const amqp = require('amqplib');
const { pipeline } = require('stream');
const { EventEmitter } = require('events');
const {
  PacketConsumer,
  MessageListener,
  PacketPublisher,
} = require('../messaging');

class MicroService extends EventEmitter {
  constructor() {
    super();
    this.channel = null;
    this.middlewares = [];
  }

  static async connect(options) {
    const microService = new MicroService();
    await microService.connect(options);
    return microService;
  }

  async connect(options = {}) {
    const { url = 'amqp://localhost', ...rest } = options;
    const client = await amqp.connect(url, rest);
    this.channel = await client.createChannel();
    return this.channel;
  }

  consume(queue, callback) {
    pipeline(
      new PacketConsumer(this.channel, queue),
      ...this.middlewares.map((middleware) => middleware()),
      new MessageListener(callback),
      (error) => {
        if (error) {
          this.emit('error', error);
        }
      }
    );
  }

  use(middleware) {
    this.middlewares.push(middleware);
    return this;
  }

  getWriteStream(clientId) {
    // todo maintain a Map to avoid duplicates
    return new PacketPublisher(this.channel, { clientId });
  }

  pipe(partner) {
    partner.on('client', (client) => {
      pipeline(
        new PacketConsumer(this.channel, client.clientId),
        ...this.middlewares.map((middleware) => middleware()),
        partner.getWriteStream(client),
        (error) => {
          if (error) {
            this.emit('error', error);
          }
        }
      );
    });
  }
}

module.exports = MicroService;
