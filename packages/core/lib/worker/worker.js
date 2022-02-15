const { EventEmitter } = require('events');
const { v4: uuidv4 } = require('uuid');
const amqp = require('amqplib');
const DefaultSerializer = require('./default-serializer');

const REQUEST_EXCHANGE = 'requests';
const RESPONSE_EXCHANGE = 'responses';

class Worker extends EventEmitter {
  constructor(options = {}) {
    super();
    const prefix = options.prefix ?? 'worker';
    const id = options.id ?? uuidv4();
    this.id = `${prefix}-${id}`;
    this.serializer = options.serializer ?? DefaultSerializer;
    this.client = null;
    this.channel = null;
  }

  async connect(url, options) {
    this.client = await amqp.connect(url, {
      ...options,
      userId: this.id,
    });
    this.channel = await this.client.createChannel();
  }

  // like .on, but over network
  consume(eventName, listener) {
    super.on(eventName, listener);
    (async () => {
      try {
        await this.channel.assertExchange(REQUEST_EXCHANGE, 'direct', {
          durable: false,
        });
        const { queue } = await this.channel.assertQueue('', {
          exclusive: true,
        });
        await this.channel.bindQueue(queue, REQUEST_EXCHANGE, eventName);
        await this.channel.consume(
          queue,
          (msg) => super.emit(eventName, this.deserialize(msg)),
          { noAck: true }
        );
      } catch (error) {
        super.emit('error');
      }
    })();
  }

  // like .emit, but over network
  publish(message) {
    // publish to REQUEST_EXCHANGE and RESPONSE_EXCHANGE
  }

  // in the spirit of socket.send
  sendTo(message, clientId) {
    // publish to RESPONSE_EXCHANGE
  }
}

module.exports = Worker;
