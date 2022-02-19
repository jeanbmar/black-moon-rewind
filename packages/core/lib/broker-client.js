const { Duplex } = require('stream');
const { v4: uuidv4 } = require('uuid');
const amqp = require('amqplib');

class BrokerClient {
  constructor(options = {}) {
    this.id = uuidv4();
    if (options.prefix) {
      this.id = `${options.prefix}-${this.id}`;
    }
    this.client = null;
    this.channel = null;
    this.seq = 1;
  }

  nextUid() {
    const uid = `${this.id}-${this.seq}`;
    this.seq += 1;
    return uid;
  }

  static async connect(url, options) {
    const client = new this();
    await client.connect(url, options);
    return client;
  }

  async connect(url, options) {
    this.client = await amqp.connect(url, options);
    this.channel = await this.client.createChannel();
  }

  createStream() {
    const correlationId = this.nextUid();
    const { channel } = this;
    const duplex = new Duplex({
      objectMode: true,
      read() {},
      write({ header, payload }) {
        (async () => {
          try {
            const queue = `${header.type}`;
            await channel.assertQueue(queue, { durable: true });
            await channel.sendToQueue(queue, payload, { correlationId });
          } catch (error) {
            this.emit('error', error);
          }
        })();
      },
    });
    (async () => {
      try {
        await channel.assertQueue(correlationId, { durable: false });
        await channel.consume(
          correlationId,
          (msg) => {
            duplex.push({
              header: { type: msg.properties.headers.type },
              payload: msg.content,
            });
          },
          {
            noAck: true,
          }
        );
      } catch (error) {
        duplex.emit('error', error);
      }
    })();
    return duplex;
  }
}

module.exports = BrokerClient;
