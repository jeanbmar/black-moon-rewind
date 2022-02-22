const amqp = require('amqplib');
const { pipeline } = require('stream');
const { EventEmitter } = require('events');
const { PacketConsumer, MessageListener } = require('../messaging');

class MicroService extends EventEmitter {
  constructor() {
    super();
    this.channel = null;
    this.middlewares = [];
  }

  async connect(url, options) {
    const client = await amqp.connect(url, options);
    this.channel = await client.createChannel();
    return this.channel;
  }

  consume(queue, callback) {
    if (!this.channel) {
      throw new Error('a connection must be established to consume messages');
    }
    pipeline(
      new PacketConsumer(this.channel, queue),
      ...this.middlewares.map((middleware) => middleware()),
      new MessageListener(callback),
      (error) => {
        this.emit('error', error);
      }
    );
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }
}

module.exports = MicroService;
